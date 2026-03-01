import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Korisnik } from '../korisnik/entities/korisnik.entity';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Korisnik]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'rmt-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
