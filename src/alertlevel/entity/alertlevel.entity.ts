import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EventtypeEntity } from 'src/eventtype/entity/eventtype.entity';
import { AlertLevelDto } from '../dto/alertlevel.dto';

@Entity({ name: "alert_level" })
export class AlertlevelEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'alert_name'})
    name: string;

    @Column({name: 'alert_ttl'})
    ttl: number;

    @Column({name: 'alert_radius'})
    radius: number;

    @OneToMany(type => EventtypeEntity, event => event.alertLevels)
    eventTypes: EventtypeEntity[];
}
