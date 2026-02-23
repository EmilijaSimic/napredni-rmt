import { Inject, Injectable } from '@nestjs/common';
import { CreateKompanijaIteracijaDto } from './dto/create-kompanija-iteracija.dto';
import { UpdateKompanijaIteracijaDto } from './dto/update-kompanija-iteracija.dto';
import { KompanijaIteracija } from './entities/kompanija-iteracija.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { IteracijaProjekta } from '../iteracija-projekta/entities/iteracija-projekta.entity';
import { Korisnik } from '../korisnik/entities/korisnik.entity';
import { Kompanija } from '../kompanija/entities/kompanija.entity';

@Injectable()
export class KompanijaIteracijaService {

  constructor(
    @InjectRepository(KompanijaIteracija) private readonly kompanijaIteracijaRepository: Repository<KompanijaIteracija>,
    @InjectRepository(Korisnik) private readonly korisnikRepository: Repository<Korisnik>,
    @InjectRepository(IteracijaProjekta) private readonly iteracijaRepository: Repository<IteracijaProjekta>,
    @InjectRepository(Kompanija) private readonly kompanijaRepository: Repository<Kompanija>
  ) {}

  create(kompanijaId: number, createKompanijaIteracijaDto: CreateKompanijaIteracijaDto) {

    const kompanijaIteracija = this.kompanijaIteracijaRepository.create({
      iteracija: { id: createKompanijaIteracijaDto.iteracija_id },
      kompanija: { id: kompanijaId },      
      tip_partnera: createKompanijaIteracijaDto.tip_partnera,
      korisnik: { id: createKompanijaIteracijaDto.korisnik_id }
    });

     if (!this.kompanijaRepository.findOne({ where: { id: kompanijaId } } )) {
      throw new Error('Kompanija ne postoji.');
    }

     if (!this.korisnikRepository.findOne({ where: { id: createKompanijaIteracijaDto.korisnik_id } } )) {
      throw new Error('Korisnik ne postoji.');
     }

    if(!this.iteracijaRepository.findOne({ where: { id: createKompanijaIteracijaDto.iteracija_id } })) {
      throw new Error('Iteracija ne postoji.');
    }
    
    this.kompanijaIteracijaRepository.save(kompanijaIteracija);
    return 'This action adds a new kompanijaIteracija';
  }

  findAll() {
    return `This action returns all kompanijaIteracija`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kompanijaIteracija`;
  }

  update(id: number, updateKompanijaIteracijaDto: UpdateKompanijaIteracijaDto) {
    return `This action updates a #${id} kompanijaIteracija`;
  }

  remove(id: number) {
    return `This action removes a #${id} kompanijaIteracija`;
  }
}
