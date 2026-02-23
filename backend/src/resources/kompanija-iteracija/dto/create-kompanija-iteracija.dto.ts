import { IsOptional } from "class-validator/types/decorator/common/IsOptional";
import { IsEnum } from "class-validator/types/decorator/typechecker/IsEnum";
import { IsNumber } from "class-validator/types/decorator/typechecker/IsNumber";
import { IsString } from "class-validator/types/decorator/typechecker/IsString";
import { TipPartnera } from "src/enums/tip-partnera";

export class CreateKompanijaIteracijaDto {
    @IsString()
    iteracija_id: number;
            
    @IsEnum(TipPartnera)
    tip_partnera: TipPartnera;
            
    @IsOptional()
    @IsNumber()
    korisnik_id:number;
}
