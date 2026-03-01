import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Korisnik } from '../korisnik/entities/korisnik.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Korisnik)
    private readonly korisnikRepository: Repository<Korisnik>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const korisnik = await this.korisnikRepository.findOne({
      where: { username: loginDto.username },
    });

    if (!korisnik) {
      throw new UnauthorizedException('Pogrešno korisničko ime ili lozinka.');
    }

    const passwordMatch = await bcrypt.compare(loginDto.password, korisnik.lozinka);
    if (!passwordMatch) {
      throw new UnauthorizedException('Pogrešno korisničko ime ili lozinka.');
    }

    const payload = {
      sub: korisnik.id,
      username: korisnik.username,
      roles: korisnik.tip,
      kompanija_id: korisnik.kompanija_id ?? null,
    };

    const token = this.jwtService.sign(payload);
    return { token, roles: [korisnik.tip] };
  }

  async me(authHeader: string) {
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }

    const token = authHeader.split(' ')[1];
    let payload: any;

    try {
      payload = this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException();
    }

    const korisnik = await this.korisnikRepository.findOneBy({ id: payload.sub });
    if (!korisnik) throw new UnauthorizedException();

    return {
      id: String(korisnik.id),
      firstName: korisnik.ime,
      lastName: korisnik.prezime,
      initials: `${korisnik.ime[0]}${korisnik.prezime[0]}`,
      thumbUrl: '',
      dateVerificationCodeExpires: '',
      createdAt: '',
    };
  }
}
