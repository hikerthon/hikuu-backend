import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AccountEntity } from './account.entity';
import { HikeEntity } from './hike.entity';
import { EventtypeEntity } from './eventtype.entity';
import { AlertlevelEntity } from './alertlevel.entity';

@Entity({ name: "events" })
export class EventEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => EventtypeEntity, entType => entType.id, {nullable: false})
    @JoinColumn({name: 'event_type_id'})
    eventType: EventtypeEntity;

    @ManyToOne(type => AlertlevelEntity, alertLvl => alertLvl.id, {nullable: false})
    @JoinColumn({name: 'alert_level_id'})
    alertLevel: AlertlevelEntity;

    @Column({name: 'event_info'})
    eventInfo: string;

    @Column({name: 'event_time'})
    eventTime: Date;

    @ManyToOne(type => HikeEntity, {nullable: false})
    @JoinColumn({name: 'hike_id'})
    hike: HikeEntity;
    
    @Column()
    latpt: number;

    @Column()
    lngpt: number;
    
    @Column()
    radius: number;

    @ManyToOne(type => AccountEntity, acct => acct.id, {nullable: false})
    @JoinColumn({name: 'reporter_id'})
    reporter: AccountEntity;

    @Column('enum', {enum: ['PENDING', 'PROCESSING', 'RESOLVED', 'BAD']})
    stat: string;
    
    @CreateDateColumn()
    logtime: Date;

    @OneToMany(type => EventAttachmentEntity, attachment => attachment.event)
    attachments: EventAttachmentEntity[];
}

@Entity({name: 'event_attachment'})
export class EventAttachmentEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => EventEntity, event => event.id, {nullable: false})
    @JoinColumn({name: 'event_id'})
    event: EventEntity;

    @Column({name: 'image_path'})
    imagePath: string;
}