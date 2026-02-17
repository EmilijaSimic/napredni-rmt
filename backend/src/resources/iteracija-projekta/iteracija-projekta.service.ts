import { Injectable } from '@nestjs/common';
import { CreateIteracijaProjektaDto } from './dto/create-iteracija-projekta.dto';
import { UpdateIteracijaProjektaDto } from './dto/update-iteracija-projekta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IteracijaProjekta } from './entities/iteracija-projekta.entity';
import { Repository } from 'typeorm/repository/Repository';
import { NazivProjekta } from 'src/enums/naziv-projekta';

@Injectable()
export class IteracijaProjektaService {

  constructor(
    @InjectRepository(IteracijaProjekta) private readonly iteracijaProjektaRepository:Repository<IteracijaProjekta>,
  ) {}
  
  create(createIteracijaProjektaDto: CreateIteracijaProjektaDto) {
    const iteracijaProjekta = this.iteracijaProjektaRepository.create(createIteracijaProjektaDto);
    return this.iteracijaProjektaRepository.save(iteracijaProjekta);
  }

  async findLast(naziv: NazivProjekta) {
    return await this.iteracijaProjektaRepository.findOne({
      where: { naziv_projekta: naziv },
      order: { godina: 'DESC' }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} iteracijaProjekta`;
  }

  update(id: number, updateIteracijaProjektaDto: UpdateIteracijaProjektaDto) {
    return `This action updates a #${id} iteracijaProjekta`;
  }

  async remove(id: number) {
    return await this.iteracijaProjektaRepository.delete(id);
  }
}
