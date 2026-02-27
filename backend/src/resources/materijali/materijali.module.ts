import { Module } from '@nestjs/common';
import { MaterijaliService } from './materijali.service';
import { MaterijaliController } from './materijali.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materijali } from './entities/materijali.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Materijali])],
  controllers: [MaterijaliController],
  providers: [MaterijaliService],
})
export class MaterijaliModule {}
