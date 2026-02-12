import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KompanijaIteracijaService } from './kompanija-iteracija.service';
import { CreateKompanijaIteracijaDto } from './dto/create-kompanija-iteracija.dto';
import { UpdateKompanijaIteracijaDto } from './dto/update-kompanija-iteracija.dto';

@Controller('kompanija-iteracija')
export class KompanijaIteracijaController {
  constructor(private readonly kompanijaIteracijaService: KompanijaIteracijaService) {}

  @Post()
  create(@Body() createKompanijaIteracijaDto: CreateKompanijaIteracijaDto) {
    return this.kompanijaIteracijaService.create(createKompanijaIteracijaDto);
  }

  @Get()
  findAll() {
    return this.kompanijaIteracijaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kompanijaIteracijaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKompanijaIteracijaDto: UpdateKompanijaIteracijaDto) {
    return this.kompanijaIteracijaService.update(+id, updateKompanijaIteracijaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kompanijaIteracijaService.remove(+id);
  }
}
