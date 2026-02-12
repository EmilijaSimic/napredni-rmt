import { KorisnikIteracijaService } from './korisnik-iteracija.service';
import { CreateKorisnikIteracijaDto } from './dto/create-korisnik-iteracija.dto';
import { UpdateKorisnikIteracijaDto } from './dto/update-korisnik-iteracija.dto';
export declare class KorisnikIteracijaController {
    private readonly korisnikIteracijaService;
    constructor(korisnikIteracijaService: KorisnikIteracijaService);
    create(createKorisnikIteracijaDto: CreateKorisnikIteracijaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateKorisnikIteracijaDto: UpdateKorisnikIteracijaDto): string;
    remove(id: string): string;
}
