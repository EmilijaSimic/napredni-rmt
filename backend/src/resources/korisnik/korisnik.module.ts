import { Module } from '@nestjs/common';
import { KorisnikService } from './korisnik.service';
import { KorisnikController } from './korisnik.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KorisnikIteracija } from '../korisnik-iteracija/entities/korisnik-iteracija.entity';

@Module({
  imports:[TypeOrmModule.forFeature([KorisnikIteracija])],
  controllers: [KorisnikController],
  providers: [KorisnikService],
})
export class KorisnikModule {}
