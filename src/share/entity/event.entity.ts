/* eslint-disable @typescript-eslint/no-use-before-define */
import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AccountEntity } from './account.entity';
import { HikeEntity } from './hike.entity';
import { EventtypeEntity } from './eventtype.entity';
import { AlertlevelEntity } from './alertlevel.entity';

export enum EventStatusEnum {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    RESOLVED = 'RESOLVED',
    BAD = 'BAD'
}

@Entity({ name: "events" })
export class EventEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'event_type_id' })
    eventTypeId: number;

    @ManyToOne(type => EventtypeEntity, entType => entType.id, { nullable: false })
    @JoinColumn({ name: 'event_type_id' })
    eventType: EventtypeEntity;

    @Column({ name: 'alert_level_id' })
    alertLevelId: number;

    @ManyToOne(type => AlertlevelEntity, alertLvl => alertLvl.id, { nullable: false })
    @JoinColumn({ name: 'alert_level_id' })
    alertLevel: AlertlevelEntity;

    @Column({ name: 'event_info' })
    eventInfo: string;

    @Column({ name: 'event_time' })
    eventTime: Date;

    @Column({ name: 'hike_id' })
    hikeId: number;

    @ManyToOne(type => HikeEntity, { nullable: false })
    @JoinColumn({ name: 'hike_id' })
    hike: HikeEntity;

    @Column({name: 'latpt', type: 'decimal'})
    latpt: number;

    @Column({name: 'lngpt'})
    lngpt: number;

    @Column({name: 'radius'})
    radius: number;

    @Column({ name: 'reporter' })
    reporterId: number;

    @ManyToOne(type => AccountEntity, acct => acct.id, { nullable: false })
    @JoinColumn({ name: 'reporter' })
    reporter: AccountEntity;

    @Column({ type: 'enum', enum: EventStatusEnum, default: EventStatusEnum.PENDING })
    stat: string;

    @CreateDateColumn()
    logtime: Date;

    @OneToMany(type => EventAttachmentEntity, attachment => attachment.event)
    attachments: EventAttachmentEntity[];
}

@Entity({ name: 'event_attachment' })
export class EventAttachmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'event_id' })
    eventId: number;

    @ManyToOne(type => EventEntity, event => event.id, { nullable: false })
    @JoinColumn({ name: 'event_id' })
    event: EventEntity;

    @Column({ name: 'image_path' })
    imagePath: string;
}