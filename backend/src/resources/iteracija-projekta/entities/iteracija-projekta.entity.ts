import { NazivProjekta } from "src/enums/naziv-projekta";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class IteracijaProjekta {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    naziv_projekta:NazivProjekta;

    @Column()
    godina:number;
}
