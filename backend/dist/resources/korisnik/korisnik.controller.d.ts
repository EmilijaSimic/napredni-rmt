import { KorisnikService } from './korisnik.service';
import { CreateKorisnikDto } from './dto/create-korisnik.dto';
import { UpdateKorisnikDto } from './dto/update-korisnik.dto';
export declare class KorisnikController {
    private readonly korisnikService;
    constructor(korisnikService: KorisnikService);
    create(createKorisnikDto: CreateKorisnikDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateKorisnikDto: UpdateKorisnikDto): string;
    remove(id: string): string;
}
