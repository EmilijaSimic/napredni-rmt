import { Injectable } from '@nestjs/common';
import { CreateKompanijaDto } from './dto/create-kompanija.dto';
import { UpdateKompanijaDto } from './dto/update-kompanija.dto';

@Injectable()
export class KompanijaService {
  create(createKompanijaDto: CreateKompanijaDto) {
    return 'This action adds a new kompanija';
  }

  findAll() {
    return `This action returns all kompanija`;
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
