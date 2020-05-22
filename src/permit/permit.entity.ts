import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "permits" })
export class PermitEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'permit_name'})
    permitName: string;
}
