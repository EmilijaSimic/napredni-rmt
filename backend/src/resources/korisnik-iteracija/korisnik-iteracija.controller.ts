import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KorisnikIteracijaService } from './korisnik-iteracija.service';
import { CreateKorisnikIteracijaDto } from './dto/create-korisnik-iteracija.dto';
import { UpdateKorisnikIteracijaDto } from './dto/update-korisnik-iteracija.dto';

@Controller('korisnik-iteracija')
export class KorisnikIteracijaController {
  constructor(private readonly korisnikIteracijaService: KorisnikIteracijaService) {}

  @Post()
  create(@Body() createKorisnikIteracijaDto: CreateKorisnikIteracijaDto) {
    return this.korisnikIteracijaService.create(createKorisnikIteracijaDto);
  }

  @Get()
  findAll() {
    return this.korisnikIteracijaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.korisnikIteracijaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKorisnikIteracijaDto: UpdateKorisnikIteracijaDto) {
    return this.korisnikIteracijaService.update(+id, updateKorisnikIteracijaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.korisnikIteracijaService.remove(+id);
  }
}
