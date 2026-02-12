import { CreateKorisnikDto } from './dto/create-korisnik.dto';
import { UpdateKorisnikDto } from './dto/update-korisnik.dto';
export declare class KorisnikService {
    create(createKorisnikDto: CreateKorisnikDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateKorisnikDto: UpdateKorisnikDto): string;
    remove(id: number): string;
}
