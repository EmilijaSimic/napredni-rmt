import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IteracijaProjektaService } from './iteracija-projekta.service';
import { CreateIteracijaProjektaDto } from './dto/create-iteracija-projekta.dto';
import { UpdateIteracijaProjektaDto } from './dto/update-iteracija-projekta.dto';

@Controller('iteracija-projekta')
export class IteracijaProjektaController {
  constructor(
    private readonly iteracijaProjektaService: IteracijaProjektaService,
  ) {}

  @Post()
  create(@Body() createIteracijaProjektaDto: CreateIteracijaProjektaDto) {
    return this.iteracijaProjektaService.create(createIteracijaProjektaDto);
  }

  @Get()
  findAll() {
    return this.iteracijaProjektaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iteracijaProjektaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIteracijaProjektaDto: UpdateIteracijaProjektaDto,
  ) {
    return this.iteracijaProjektaService.update(
      +id,
      updateIteracijaProjektaDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iteracijaProjektaService.remove(+id);
  }
}
