import { KompanijaIteracijaService } from './kompanija-iteracija.service';
import { CreateKompanijaIteracijaDto } from './dto/create-kompanija-iteracija.dto';
import { UpdateKompanijaIteracijaDto } from './dto/update-kompanija-iteracija.dto';
export declare class KompanijaIteracijaController {
    private readonly kompanijaIteracijaService;
    constructor(kompanijaIteracijaService: KompanijaIteracijaService);
    create(createKompanijaIteracijaDto: CreateKompanijaIteracijaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateKompanijaIteracijaDto: UpdateKompanijaIteracijaDto): string;
    remove(id: string): string;
}
