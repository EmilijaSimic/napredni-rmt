import { KompanijaService } from './kompanija.service';
import { CreateKompanijaDto } from './dto/create-kompanija.dto';
import { UpdateKompanijaDto } from './dto/update-kompanija.dto';
export declare class KompanijaController {
    private readonly kompanijaService;
    constructor(kompanijaService: KompanijaService);
    create(createKompanijaDto: CreateKompanijaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateKompanijaDto: UpdateKompanijaDto): string;
    remove(id: string): string;
}
