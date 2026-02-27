import { IsBoolean, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { TipPartnera } from "src/enums/tip-partnera";

export class CreateKompanijaDto {
    @IsString()
    naziv:string;
    
    @IsString()
    websajt:string;
 
    @IsString()
    kontakt:string;
    
    @IsNumber()
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
