import { Injectable } from '@nestjs/common';
import { CreateKompanijaIteracijaDto } from './dto/create-kompanija-iteracija.dto';
import { UpdateKompanijaIteracijaDto } from './dto/update-kompanija-iteracija.dto';

@Injectable()
export class KompanijaIteracijaService {
  create(createKompanijaIteracijaDto: CreateKompanijaIteracijaDto) {
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
