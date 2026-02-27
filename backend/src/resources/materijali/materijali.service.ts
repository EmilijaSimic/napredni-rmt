import { Injectable } from '@nestjs/common';
import { CreateMaterijaliDto } from './dto/create-materijali.dto';
import { UpdateMaterijaliDto } from './dto/update-materijali.dto';

@Injectable()
export class MaterijaliService {
  create(createMaterijaliDto: CreateMaterijaliDto) {
    return 'This action adds a new materijali';
  }

  findAll() {
    return `This action returns all materijali`;
  }

  findOne(id: number) {
    return `This action returns a #${id} materijali`;
  }

  update(id: number, updateMaterijaliDto: UpdateMaterijaliDto) {
    return `This action updates a #${id} materijali`;
  }

  remove(id: number) {
    return `This action removes a #${id} materijali`;
  }
}
