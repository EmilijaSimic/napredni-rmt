import { IteracijaProjekta } from "src/resources/iteracija-projekta/entities/iteracija-projekta.entity";
import { Korisnik } from "src/resources/korisnik/entities/korisnik.entity";
import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class KorisnikIteracija {

    @PrimaryColumn()
    korisnik_id:number;

    @OneToOne(() => Korisnik)
    @JoinColumn({ name: 'korisnik_id' })
    korisnik:Korisnik;

    @PrimaryColumn()
    iteracija_id:number;

    @OneToOne(() => IteracijaProjekta)
    @JoinColumn({ name: 'iteracija_id' })
    iteracija:IteracijaProjekta;
}
