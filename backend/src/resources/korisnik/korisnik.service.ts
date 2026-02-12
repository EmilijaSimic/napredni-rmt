import { Injectable } from '@nestjs/common';
import { CreateKorisnikDto } from './dto/create-korisnik.dto';
import { UpdateKorisnikDto } from './dto/update-korisnik.dto';

@Injectable()
export class KorisnikService {
  create(createKorisnikDto: CreateKorisnikDto) {
    return 'This action adds a new korisnik';
  }

  findAll() {
    return `This action returns all korisnik`;
  }

  findOne(id: number) {
    return `This action returns a #${id} korisnik`;
  }

  update(id: number, updateKorisnikDto: UpdateKorisnikDto) {
    return `This action updates a #${id} korisnik`;
  }

  remove(id: number) {
    return `This action removes a #${id} korisnik`;
  }
}
