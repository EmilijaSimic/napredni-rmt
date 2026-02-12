import { Module } from '@nestjs/common';
import { IteracijaProjektaService } from './iteracija-projekta.service';
import { IteracijaProjektaController } from './iteracija-projekta.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IteracijaProjekta } from './entities/iteracija-projekta.entity';

@Module({
  imports:[TypeOrmModule.forFeature([IteracijaProjekta])],
  controllers: [IteracijaProjektaController],
  providers: [IteracijaProjektaService],
})
export class IteracijaProjektaModule {}
