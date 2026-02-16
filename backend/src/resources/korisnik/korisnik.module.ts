import { Module } from '@nestjs/common';
import { KorisnikService } from './korisnik.service';
import { KorisnikController } from './korisnik.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KorisnikIteracija } from '../korisnik-iteracija/entities/korisnik-iteracija.entity';
import { Korisnik } from './entities/korisnik.entity';

@Module({
  imports:[TypeOrmModule.forFeature([KorisnikIteracija, Korisnik])],
  controllers: [KorisnikController],
  providers: [KorisnikService],
})
export class KorisnikModule {}
