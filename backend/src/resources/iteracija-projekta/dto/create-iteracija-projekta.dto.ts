import { IsEnum, IsNumber, IsString } from 'class-validator';
import { NazivProjekta } from 'src/enums/naziv-projekta';

export class CreateIteracijaProjektaDto {

    @IsEnum(NazivProjekta)
    naziv_projekta: NazivProjekta;

    @IsNumber()
    godina: number;
}
