import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Materijali } from './entities/materijali.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { TipKorisnika } from 'src/enums/tip-korisnika';

@Injectable()
export class MaterijaliService {
  constructor(
    @InjectRepository(Materijali)
    private readonly materijaliRepository: Repository<Materijali>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly jwtService: JwtService,
  ) {}

  private verifyAdmin(authHeader: string): void {
    if (!authHeader?.startsWith('Bearer ')) throw new UnauthorizedException();
    const token = authHeader.split(' ')[1];
    let payload: any;
    try {
      payload = this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException();
    }
    if (payload.roles !== TipKorisnika.ADMIN) {
      throw new UnauthorizedException('Samo admin može pristupiti ovoj akciji.');
    }
  }

  async uploadMaterijal(
    file: Express.Multer.File,
    kompanija_id: string,
    authHeader: string,
  ) {
    this.verifyAdmin(authHeader);

    const uploaded = await this.cloudinaryService.uploadFile(file);

    const materijal = this.materijaliRepository.create({
      url: uploaded.url,
      javniId: uploaded.publicId,
      originalnoIme: uploaded.originalName,
      imeCloud: uploaded.displayName,
      kompanija_id: Number(kompanija_id),
      tags: uploaded.tags,
    });

    return await this.materijaliRepository.save(materijal);
  }

  async findAll(search?: string) {
    const qb = this.materijaliRepository.createQueryBuilder('m')
      .leftJoinAndSelect('m.kompanija', 'k')
      .orderBy('k.naziv', 'ASC')
      .addOrderBy('m.datumKreiranja', 'DESC');

    if (search) {
      qb.where(
        'k.naziv ILIKE :s OR m."originalnoIme" ILIKE :s OR m.tags ILIKE :s',
        { s: `%${search}%` },
      );
    }

    return await qb.getMany();
  }

  async findKompanije() {
    return await this.materijaliRepository
      .createQueryBuilder('m')
      .select('k.id', 'id')
      .addSelect('k.naziv', 'naziv')
      .leftJoin('m.kompanija', 'k')
      .groupBy('k.id')
      .addGroupBy('k.naziv')
      .orderBy('k.naziv', 'ASC')
      .getRawMany();
  }

  async syncTags(authHeader: string) {
    this.verifyAdmin(authHeader);

    const cloudinaryResources = await this.cloudinaryService.getAllResourceTags();
    const tagMap = new Map(cloudinaryResources.map(r => [r.publicId, r.tags]));

    const all = await this.materijaliRepository.find();
    let updated = 0;

    for (const m of all) {
      const tags = tagMap.get(m.javniId);
      if (tags !== undefined) {
        m.tags = tags;
        await this.materijaliRepository.save(m);
        updated++;
      }
    }

    return { message: `Sinkronizirano ${updated} materijala.`, updated };
  }

  async remove(id: number, authHeader: string) {
    this.verifyAdmin(authHeader);

    const materijal = await this.materijaliRepository.findOneBy({ id });
    if (!materijal) throw new NotFoundException('Materijal nije pronađen.');

    await this.cloudinaryService.deleteFile(materijal.javniId, materijal.url);
    await this.materijaliRepository.delete(id);

    return { message: 'Materijal je uspješno obrisan.' };
  }
}
