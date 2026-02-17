import { Injectable } from '@nestjs/common';
import { CreateKorisnikDto } from './dto/create-korisnik.dto';
import { UpdateKorisnikDto } from './dto/update-korisnik.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Korisnik } from './entities/korisnik.entity';
import { Repository } from 'typeorm';

@Injectable()
export class KorisnikService {

  constructor(
    @InjectRepository(Korisnik) private readonly korisnikRepository:Repository<Korisnik>,
  ) 
  {}

  async create(createKorisnikDto: CreateKorisnikDto) {
    const korisnik = this.korisnikRepository.create(createKorisnikDto);
    return await this.korisnikRepository.save(korisnik);
  }

  async findAllByProject(idProjekta: number) {
    return await this.korisnikRepository.find({
      relations: {korisnikIteracije: true},
      where: {korisnikIteracije: {iteracija_id: idProjekta},
      },},
  );
  }

  async findOne(id: number) {
    return await this.korisnikRepository.findOneBy({id});
  }

  update(id: number, updateKorisnikDto: UpdateKorisnikDto) {
    return `This action updates a #${id} korisnik`;
  }

  async remove(id: number) {
    return await this.korisnikRepository.delete(id);
  }
}