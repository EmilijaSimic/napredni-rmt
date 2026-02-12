import { CreateIteracijaProjektaDto } from './dto/create-iteracija-projekta.dto';
import { UpdateIteracijaProjektaDto } from './dto/update-iteracija-projekta.dto';
export declare class IteracijaProjektaService {
    create(createIteracijaProjektaDto: CreateIteracijaProjektaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateIteracijaProjektaDto: UpdateIteracijaProjektaDto): string;
    remove(id: number): string;
}
