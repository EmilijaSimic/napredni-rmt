import { IsBoolean, IsDateString, IsEnum, IsNumber, IsOptional } from "class-validator";
import { IsString } from "class-validator/types/decorator/typechecker/IsString";
import { TipPartnera } from "src/enums/tip-partnera";

export class CreateKompanijaDto {
    @IsString()
    naziv:string;
    
    @IsString()
    websajt:string;
 
    @IsString()
    kontakt:string;
    
    @IsString()
    iteracija_id: number;
        
    @IsEnum(TipPartnera)
    tip_partnera: TipPartnera;
    
    @IsOptional()
    @IsDateString()
    datum_cimanja: Date;
        
    @IsOptional()
    @IsDateString()
    datum_podsetnik: Date;
        
    @IsOptional()
    @IsDateString()
    datum_poziv: Date;
        
    @IsOptional()
    @IsBoolean()
    odobrena:boolean;
      
    @IsOptional()
    @IsNumber()
    korisnik_id:number;
}
