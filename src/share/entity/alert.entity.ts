import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { AlertlevelEntity } from './alertlevel.entity';
import { EventtypeEntity } from './eventtype.entity';
import { PermitEntity } from './permit.entity';
import { AccountEntity } from './account.entity';

@Entity({ name: "alerts" })
export class AlertEntity {
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

    @Column({name: 'event_end'})
    eventEnd: Date;

    @ManyToOne(type => PermitEntity, permit => permit.id, {nullable: false})
    @JoinColumn({name: 'permit_id'})
    permit: PermitEntity;

    @Column()
    latpt: number;

    @Column()
    lngpt: number;

    @Column()
    radius: number;

    @Column()
    creator: number;

    @ManyToOne(type => AccountEntity, entType => entType.id, {nullable: true})
    @JoinColumn({name: 'origin_source'})
    originSource: AccountEntity;

    @CreateDateColumn()
    logtime: Date;
    
    @OneToMany(type => AlertAttachmentEntity, attachment => attachment.alert)
    attachments: AlertAttachmentEntity[];
}

@Entity({name: 'alert_attachment'})
export class AlertAttachmentEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => AlertEntity, alert => alert.id, {nullable: false})
    @JoinColumn({name: 'alert_id'})
    alert: AlertEntity;

    @Column({name: 'image_path'})
    imagePath: string;
}
