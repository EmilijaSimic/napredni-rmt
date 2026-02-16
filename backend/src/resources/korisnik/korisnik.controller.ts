import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KorisnikService } from './korisnik.service';
import { CreateKorisnikDto } from './dto/create-korisnik.dto';
import { UpdateKorisnikDto } from './dto/update-korisnik.dto';

@Controller('korisnik')
export class KorisnikController {
  constructor(private readonly korisnikService: KorisnikService) {}

  @Post()
  async create(@Body() createKorisnikDto: CreateKorisnikDto) {
    return await this.korisnikService.create(createKorisnikDto);
  }

  @Get(':idProjekta')
  async findAll(@Param('idProjekta') idProjekta: string) {
    return await this.korisnikService.findAll(+idProjekta);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.korisnikService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKorisnikDto: UpdateKorisnikDto) {
    return this.korisnikService.update(+id, updateKorisnikDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.korisnikService.remove(+id);
  }
}
