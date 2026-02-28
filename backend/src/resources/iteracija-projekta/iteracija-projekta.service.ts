import { Injectable } from '@nestjs/common';
import { CreateIteracijaProjektaDto } from './dto/create-iteracija-projekta.dto';
import { UpdateIteracijaProjektaDto } from './dto/update-iteracija-projekta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IteracijaProjekta } from './entities/iteracija-projekta.entity';
import { Repository } from 'typeorm/repository/Repository';
import { NazivProjekta } from 'src/enums/naziv-projekta';
import { KompanijaIteracija } from '../kompanija-iteracija/entities/kompanija-iteracija.entity';
import { TipPartnera } from 'src/enums/tip-partnera';
import { BatchKompanijaIteracijaDto } from './dto/batch-kompanija-iteracija.dto';

@Injectable()
export class IteracijaProjektaService {

  constructor(
    @InjectRepository(IteracijaProjekta) private readonly iteracijaProjektaRepository: Repository<IteracijaProjekta>,
    @InjectRepository(KompanijaIteracija) private readonly kompanijaIteracijaRepository: Repository<KompanijaIteracija>,
  ) {}
  
  create(createIteracijaProjektaDto: CreateIteracijaProjektaDto) {
    const iteracijaProjekta = this.iteracijaProjektaRepository.create(createIteracijaProjektaDto);
    return this.iteracijaProjektaRepository.save(iteracijaProjekta);
  }

  async findLast(naziv: NazivProjekta) {
    return await this.iteracijaProjektaRepository.findOne({
      where: { naziv_projekta: naziv },
      order: { godina: 'DESC' }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} iteracijaProjekta`;
  }

  update(id: number, updateIteracijaProjektaDto: UpdateIteracijaProjektaDto) {
    return `This action updates a #${id} iteracijaProjekta`;
  }

  async remove(id: number) {
    return await this.iteracijaProjektaRepository.delete(id);
  }

  async batchAddKompanije(iteracijaId: number, dto: BatchKompanijaIteracijaDto) {
    const records = dto.kompanija_ids.map(kompanija_id =>
      this.kompanijaIteracijaRepository.create({
        kompanija_id,
        iteracija_id: iteracijaId,
        tip_partnera: dto.tip_partnera,
      }),
    );
    return await this.kompanijaIteracijaRepository.save(records);
  }

  async findKompanije(iteracijaId: number, tipPartnera: TipPartnera, status?: string) {
    const where: any = { iteracija_id: iteracijaId, tip_partnera: tipPartnera };

    if (status?.startsWith('potvrdje')) where.odobrena = true;
    else if (status?.startsWith('odbije')) where.odobrena = false;

    const items = await this.kompanijaIteracijaRepository.find({
      where,
      relations: { kompanija: true, korisnik: true },
    });

    return items.map(item => ({
      ID: item.kompanija.id,
      naziv: item.kompanija.naziv,
      websajt: item.kompanija.websajt,
      kontakt: item.kompanija.kontakt,
      zaduzen: item.korisnik ? `${item.korisnik.ime} ${item.korisnik.prezime}` : null,
      datumCimanja: item.datum_cimanja,
      datumPodsetnik: item.datum_podsetnik,
      datumPoziva: item.datum_poziv,
      odobreno: item.odobrena,
      stanje: item.odobrena === true ? 'Odobreno' : item.odobrena === false ? 'Odbijeno' : 'Nije dodeljeno',
      brojCimanja: 0,
      brojOdbijanja: 0,
      brojPrihvatanja: 0,
      napomena: '',
    }));
  }
}
