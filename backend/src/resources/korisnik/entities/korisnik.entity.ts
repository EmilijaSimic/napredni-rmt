import { TipKorisnika } from "src/enums/tip-korisnika";
import { KompanijaIteracija } from "src/resources/kompanija-iteracija/entities/kompanija-iteracija.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => KompanijaIteracija, ki => ki.korisnik)
    ki:KompanijaIteracija[];
}
