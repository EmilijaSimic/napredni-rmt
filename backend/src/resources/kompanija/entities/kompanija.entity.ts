import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
}
