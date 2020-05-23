import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToOne } from 'typeorm';
import { AccountEntity } from './account.entity';
import { HikeEntity } from './hike.entity';

@Entity({ name: "tracker" })
export class TrackerEntity {
    @OneToOne(type => AccountEntity, {primary: true, nullable: false})
    @JoinColumn({name: 'hiker_id'})
    hiker: AccountEntity;

    @ManyToOne(type => HikeEntity, {nullable: false})
    @JoinColumn({name: 'hike_id'})
    hike: HikeEntity;

    @Column({name: 'record_time'})
    recordTime: Date;

    @Column()
    latpt: number;

    @Column()
    lngpt: number;

    @Column()
    elevation: number;

    @Column()
    battery: number;

    @Column()
    network: number;

    @Column('time', {name: 'elapsed_time'})
    elapsedTime: Date;

    @CreateDateColumn()
    logtime: Date;
}
