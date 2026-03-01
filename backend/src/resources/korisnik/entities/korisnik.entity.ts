import { TipKorisnika } from "src/enums/tip-korisnika";
import { KompanijaIteracija } from "src/resources/kompanija-iteracija/entities/kompanija-iteracija.entity";
import { KorisnikIteracija } from "src/resources/korisnik-iteracija/entities/korisnik-iteracija.entity";
import { Kompanija } from "src/resources/kompanija/entities/kompanija.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Korisnik {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    username:string;

    @Column()
    lozinka:string;

    @Column()
    ime:string;

    @Column()
    prezime:string;

    @Column()
    tip:TipKorisnika;

    @Column({ nullable: true })
    kompanija_id: number | null;

    @ManyToOne(() => Kompanija, { nullable: true })
    @JoinColumn({ name: 'kompanija_id' })
    kompanija: Kompanija;

    @OneToMany(() => KompanijaIteracija, ki => ki.korisnik)
    ki:KompanijaIteracija[];

    @OneToMany(() => KorisnikIteracija, ki => ki.korisnik)
    korisnikIteracije: KorisnikIteracija[];
}
