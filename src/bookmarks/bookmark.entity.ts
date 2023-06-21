import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bookmarks {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    title: string;

    @Column("varchar", { length: 1000 })
    description: string

    @Column()
    link: string;

}