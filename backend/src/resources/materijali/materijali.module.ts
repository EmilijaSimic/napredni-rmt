import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { MaterijaliService } from './materijali.service';
import { MaterijaliController } from './materijali.controller';
import { Materijali } from './entities/materijali.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Kompanija } from '../kompanija/entities/kompanija.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Materijali, Kompanija]),
    CloudinaryModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'rmt-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [MaterijaliController],
  providers: [MaterijaliService],
})
export class MaterijaliModule {}
