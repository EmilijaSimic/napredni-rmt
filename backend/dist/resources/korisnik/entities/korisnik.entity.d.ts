import { TipKorisnika } from "src/enums/tip-korisnika";
import { KompanijaIteracija } from "src/resources/kompanija-iteracija/entities/kompanija-iteracija.entity";
export declare class Korisnik {
    id: number;
    username: string;
    lozinka: string;
    ime: string;
    prezime: string;
    tip: TipKorisnika;
    ki: KompanijaIteracija[];
}
