import { Injectable } from '@nestjs/common';
import { CreateIteracijaProjektaDto } from './dto/create-iteracija-projekta.dto';
import { UpdateIteracijaProjektaDto } from './dto/update-iteracija-projekta.dto';

@Injectable()
export class IteracijaProjektaService {
  create(createIteracijaProjektaDto: CreateIteracijaProjektaDto) {
    return 'This action adds a new iteracijaProjekta';
  }

  findAll() {
    return `This action returns all iteracijaProjekta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} iteracijaProjekta`;
  }

  update(id: number, updateIteracijaProjektaDto: UpdateIteracijaProjektaDto) {
    return `This action updates a #${id} iteracijaProjekta`;
  }

  remove(id: number) {
    return `This action removes a #${id} iteracijaProjekta`;
  }
}
