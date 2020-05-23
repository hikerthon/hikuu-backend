import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TrailEntity } from './trail.entity';
import { HikeEntity } from './hike.entity';

@Entity({ name: "permits" })
export class PermitEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'permit_name'})
    name: string;
    
    @OneToMany(type => TrailEntity, event => event.permit)
    trails: TrailEntity[];
    
    @OneToMany(type => HikeEntity, hike => hike.permitId)
    hikes: HikeEntity[];
}
