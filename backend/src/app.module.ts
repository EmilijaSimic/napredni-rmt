import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KompanijaModule } from './resources/kompanija/kompanija.module';
import { KorisnikModule } from './resources/korisnik/korisnik.module';
import { IteracijaProjektaModule } from './resources/iteracija-projekta/iteracija-projekta.module';
import { KorisnikIteracijaModule } from './resources/korisnik-iteracija/korisnik-iteracija.module';
import { KompanijaIteracijaModule } from './resources/kompanija-iteracija/kompanija-iteracija.module';


@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'postgres'  ,
      host: 'localhost',
      port: 5431,
      username: 'postgres',
      password: 'lozinka',
      database: 'napredni_rmt_baza',
      autoLoadEntities: true,
      synchronize: true,
  }),
  KompanijaModule,
  KorisnikModule,
  IteracijaProjektaModule,
  KorisnikIteracijaModule,
  KompanijaIteracijaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
