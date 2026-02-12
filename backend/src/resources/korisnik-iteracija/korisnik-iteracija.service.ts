import { Injectable } from '@nestjs/common';
import { CreateKorisnikIteracijaDto } from './dto/create-korisnik-iteracija.dto';
import { UpdateKorisnikIteracijaDto } from './dto/update-korisnik-iteracija.dto';

@Injectable()
export class KorisnikIteracijaService {
  create(createKorisnikIteracijaDto: CreateKorisnikIteracijaDto) {
    return 'This action adds a new korisnikIteracija';
  }

  findAll() {
    return `This action returns all korisnikIteracija`;
  }

  findOne(id: number) {
    return `This action returns a #${id} korisnikIteracija`;
  }

  update(id: number, updateKorisnikIteracijaDto: UpdateKorisnikIteracijaDto) {
    return `This action updates a #${id} korisnikIteracija`;
  }

  remove(id: number) {
    return `This action removes a #${id} korisnikIteracija`;
  }
}
