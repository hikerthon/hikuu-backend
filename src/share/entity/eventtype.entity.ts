import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { AlertlevelEntity } from './alertlevel.entity';

@Entity({ name: "event_type" })
export class EventtypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'event_type_name'})
    name: string;

    @Column({name: 'event_type_desc'})
    description: string;

    @ManyToOne(type => AlertlevelEntity, alertLvl => alertLvl.eventTypes)
    @JoinColumn({name: 'default_alert'})
    defaultAlert: AlertlevelEntity;
}
