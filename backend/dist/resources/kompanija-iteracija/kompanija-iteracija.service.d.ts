import { CreateKompanijaIteracijaDto } from './dto/create-kompanija-iteracija.dto';
import { UpdateKompanijaIteracijaDto } from './dto/update-kompanija-iteracija.dto';
export declare class KompanijaIteracijaService {
    create(createKompanijaIteracijaDto: CreateKompanijaIteracijaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateKompanijaIteracijaDto: UpdateKompanijaIteracijaDto): string;
    remove(id: number): string;
}
