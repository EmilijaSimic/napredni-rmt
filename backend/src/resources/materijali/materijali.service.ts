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
    });

    return await this.materijaliRepository.save(materijal);
  }

  async findByKompanija(kompanija_id: number) {
    return await this.materijaliRepository.find({
      where: { kompanija_id },
      order: { datumKreiranja: 'DESC' },
    });
  }

  async findMoje(authHeader: string) {
    if (!authHeader?.startsWith('Bearer ')) throw new UnauthorizedException();
    const token = authHeader.split(' ')[1];
    let payload: any;
    try {
      payload = this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException();
    }
    if (!payload.kompanija_id) return [];
    return await this.materijaliRepository.find({
      where: { kompanija_id: payload.kompanija_id },
      order: { datumKreiranja: 'DESC' },
    });
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
