import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaterijaliService } from './materijali.service';
import { CreateMaterijaliDto } from './dto/create-materijali.dto';
import { UpdateMaterijaliDto } from './dto/update-materijali.dto';

@Controller('materijali')
export class MaterijaliController {
  constructor(private readonly materijaliService: MaterijaliService) {}

  @Post()
  create(@Body() createMaterijaliDto: CreateMaterijaliDto) {
    return this.materijaliService.create(createMaterijaliDto);
  }

  @Get()
  findAll() {
    return this.materijaliService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materijaliService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterijaliDto: UpdateMaterijaliDto) {
    return this.materijaliService.update(+id, updateMaterijaliDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materijaliService.remove(+id);
  }
}
