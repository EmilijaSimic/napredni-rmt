import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Materijali {
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string; 

  @Column()
  javniId: string;

  @Column()
  originalnoIme: string;

  @Column()
  imeCloud: string;

  @Column()
  datumKreiranja: Date;
}
