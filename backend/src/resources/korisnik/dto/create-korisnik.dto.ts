import { TipKorisnika } from "src/enums/tip-korisnika";

export class CreateKorisnikDto {
    username:string;
    lozinka:string;
    ime:string;
    prezime:string;
    tip:TipKorisnika;
}
