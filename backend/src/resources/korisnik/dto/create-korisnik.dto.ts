import { TipKorisnika } from "src/enums/tip-korisnika";
import { IsEnum } from 'class-validator';


export class CreateKorisnikDto {
    username:string;
    lozinka:string;
    ime:string;
    prezime:string;

    @IsEnum(TipKorisnika)
    tip:TipKorisnika;
}
