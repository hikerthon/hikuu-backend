import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AlertlevelEntity } from 'src/alertlevel/entity/alertlevel.entity';
import { EventtypeEntity } from 'src/eventtype/entity/eventtype.entity';
import { PermitEntity } from 'src/permit/permit.entity';

@Entity({ name: "alerts" })
export class AlertEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => EventtypeEntity, entType => entType.id)
    @JoinColumn({name: 'event_type_id'})
    eventTypeId: number;

    @ManyToOne(type => AlertlevelEntity, alertLvl => alertLvl.id)
    @JoinColumn({name: 'alert_level_id'})
    alertLevelId: AlertlevelEntity;

    @Column({name: 'event_info'})
    eventInfo: string;

    @Column({name: 'event_time'})
    eventTime: Date;

    @Column({name: 'event_end'})
    eventEnd: Date;

    @ManyToOne(type => PermitEntity, permit => permit.id)
    @JoinColumn({name: 'permit_id'})
    permitId: PermitEntity;

    @Column()
    latpt: number;

    @Column()
    lngpt: number;

    @Column()
    radius: number;

    @Column()
    creator: number;

    // @ManyToOne(type => EventtypeEntity, entType => entType.id, {nullable: true})
    // @JoinColumn({name: 'origin_source'})
    @Column({name: 'origin_source', nullable: true})
    originSource: number;

    @Column({ type:'datetime', default: () => 'NOW()'})
    logtime: Date;
}
