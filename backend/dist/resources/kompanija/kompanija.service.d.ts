import { CreateKompanijaDto } from './dto/create-kompanija.dto';
import { UpdateKompanijaDto } from './dto/update-kompanija.dto';
export declare class KompanijaService {
    create(createKompanijaDto: CreateKompanijaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateKompanijaDto: UpdateKompanijaDto): string;
    remove(id: number): string;
}
