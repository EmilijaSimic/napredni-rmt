import { Module } from '@nestjs/common';
import { KompanijaService } from './kompanija.service';
import { KompanijaController } from './kompanija.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kompanija } from './entities/kompanija.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Kompanija])],
  controllers: [KompanijaController],
  providers: [KompanijaService],
})
export class KompanijaModule {}
