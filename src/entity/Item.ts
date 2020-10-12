import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn, VersionColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    status: boolean;

    @Column()
    dueDate: Date;

    @VersionColumn()
    version: number;

    @ManyToOne(type => User, user => user.items)
    user: User;
}
