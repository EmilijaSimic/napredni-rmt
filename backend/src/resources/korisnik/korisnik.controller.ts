import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KorisnikService } from './korisnik.service';
import { CreateKorisnikDto } from './dto/create-korisnik.dto';
import { UpdateKorisnikDto } from './dto/update-korisnik.dto';

@Controller('korisnik')
export class KorisnikController {
  constructor(private readonly korisnikService: KorisnikService) {}

  @Post()
  create(@Body() createKorisnikDto: CreateKorisnikDto) {
    return this.korisnikService.create(createKorisnikDto);
  }

  @Get()
  findAll() {
    return this.korisnikService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.korisnikService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKorisnikDto: UpdateKorisnikDto) {
    return this.korisnikService.update(+id, updateKorisnikDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.korisnikService.remove(+id);
  }
}
