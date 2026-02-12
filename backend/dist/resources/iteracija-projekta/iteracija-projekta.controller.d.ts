import { IteracijaProjektaService } from './iteracija-projekta.service';
import { CreateIteracijaProjektaDto } from './dto/create-iteracija-projekta.dto';
import { UpdateIteracijaProjektaDto } from './dto/update-iteracija-projekta.dto';
export declare class IteracijaProjektaController {
    private readonly iteracijaProjektaService;
    constructor(iteracijaProjektaService: IteracijaProjektaService);
    create(createIteracijaProjektaDto: CreateIteracijaProjektaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateIteracijaProjektaDto: UpdateIteracijaProjektaDto): string;
    remove(id: string): string;
}
