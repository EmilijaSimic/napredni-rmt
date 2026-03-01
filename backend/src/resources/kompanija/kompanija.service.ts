import { Injectable } from '@nestjs/common';
import { CreateKompanijaDto } from './dto/create-kompanija.dto';
import { UpdateKompanijaDto } from './dto/update-kompanija.dto';
import { IteracijaProjekta } from '../iteracija-projekta/entities/iteracija-projekta.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { KompanijaIteracija } from '../kompanija-iteracija/entities/kompanija-iteracija.entity';
import { Kompanija } from './entities/kompanija.entity';
import { Korisnik } from '../korisnik/entities/korisnik.entity';

@Injectable()
export class KompanijaService {

  constructor(
    @InjectRepository(Kompanija) private readonly kompanijaRepository: Repository<Kompanija>,
    @InjectRepository(KompanijaIteracija) private readonly kompanijaIteracijaRepository: Repository<KompanijaIteracija>,
    @InjectRepository(IteracijaProjekta) private readonly iteracijaRepository: Repository<IteracijaProjekta>,
    @InjectRepository(Korisnik) private readonly korisnikRepository: Repository<Korisnik>
  ) {}

  async create(createKompanijaDto: CreateKompanijaDto) {
    const kompanija = this.kompanijaRepository.create(createKompanijaDto);
    return await this.kompanijaRepository.save(kompanija);
  }

  async findAll() {
    return await this.kompanijaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} kompanija`;
  }

  update(id: number, updateKompanijaDto: UpdateKompanijaDto) {
    return `This action updates a #${id} kompanija`;
  }

  remove(id: number) {
    return `This action removes a #${id} kompanija`;
  }
}
