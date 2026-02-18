import { KompanijaIteracija } from "src/resources/kompanija-iteracija/entities/kompanija-iteracija.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Kompanija {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    naziv:string;

    @Column()
    websajt:string;

    @Column()
    kontakt:string;

    @OneToMany(() => KompanijaIteracija, ki => ki.kompanija)
    kompanijaIteracije: KompanijaIteracija[];
}
