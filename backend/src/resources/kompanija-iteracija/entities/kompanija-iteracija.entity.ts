import { TipPartnera } from "src/enums/tip-partnera";
import { IteracijaProjekta } from "src/resources/iteracija-projekta/entities/iteracija-projekta.entity";
import { Kompanija } from "src/resources/kompanija/entities/kompanija.entity";
import { Korisnik } from "src/resources/korisnik/entities/korisnik.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class KompanijaIteracija {

    @PrimaryColumn()
    kompanija_id: number;

    @OneToOne(() => Kompanija)
    @JoinColumn({ name: 'kompanija_id' })
    kompanija: Kompanija;

    @PrimaryColumn()
    iteracija_id: number;

    @OneToOne(() => IteracijaProjekta)
    @JoinColumn({ name: 'iteracija_id' })
    iteracija:IteracijaProjekta;

    @Column()
    tip_partnera: TipPartnera;

    @Column({ type: 'date' })
    datum_cimanja: Date;

    @Column({ type: 'date' })
    datum_podsetnik: Date;

    @Column({ type: 'date' })
    datum_poziv: Date;

    @Column({ type: 'date' })
    odobrena:boolean;

    @ManyToOne(() => Korisnik, korisnik => korisnik.ki)
    @JoinColumn({ name: 'korisnik_id' })
    korisnik:Korisnik;
}
