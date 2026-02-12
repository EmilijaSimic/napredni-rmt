import { CreateKorisnikIteracijaDto } from './dto/create-korisnik-iteracija.dto';
import { UpdateKorisnikIteracijaDto } from './dto/update-korisnik-iteracija.dto';
export declare class KorisnikIteracijaService {
    create(createKorisnikIteracijaDto: CreateKorisnikIteracijaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateKorisnikIteracijaDto: UpdateKorisnikIteracijaDto): string;
    remove(id: number): string;
}
