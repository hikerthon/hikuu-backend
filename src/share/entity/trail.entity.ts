import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PermitEntity } from './permit.entity';

@Entity({ name: "trails" })
export class TrailEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'trail_name'})
    name: string;

    @ManyToOne(type => PermitEntity, permit => permit.trails)
    @JoinColumn({name:'permit'})
    permit: PermitEntity;
}
