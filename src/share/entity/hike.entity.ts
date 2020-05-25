import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';
import { PermitEntity } from './permit.entity';
import { TrailEntity } from './trail.entity';

@Entity({ name: "hikes" })
export class HikeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'hiker_id', nullable:true})
    hikerId: number;

    @ManyToOne(type => AccountEntity, account => account.hikes)
    @JoinColumn({name:'hiker_id'})
    hiker: AccountEntity;

    @Column({name: 'hike_start'})
    hikeStart: Date;

    @Column({name: 'hike_end'})
    hikeEnd: Date;

    @Column({name: 'permit_id', nullable:true})
    permitId: number;

    @ManyToOne(type => PermitEntity)
    @JoinColumn({name:'permit_id'})
    permit: PermitEntity;

    @Column({name: 'guide_name'})
    guideName: string;

    @Column({name: 'guide_contact'})
    guideContact: string;

    @Column({name: 'guide_contact2'})
    guideContact2: string;

    @Column('enum', {name: 'permit_accepted', enum: ['PENDING', 'ACCEPTED', 'REJECTED']})
    permitAccepted: string;

    @Column({name: 'accepted_time'})
    acceptedTime: Date;

    @Column()
    memo: string;

    @Column({name: 'hike_started', default: false})
    hikeStarted: boolean;

    @Column({name: 'hike_finished', default: false})
    hikeFinished: boolean;

    @Column({name: 'hike_cancelled', default: false})
    hikeCancelled: boolean;

    @CreateDateColumn()
    logtime: Date;
    
    @ManyToMany(type => TrailEntity)
    @JoinTable({
        name: 'hike_destination', 
        joinColumn: {name: 'hike_id'}, 
        inverseJoinColumn: {name: 'trail_id'}
    })
    trails: TrailEntity[];
}
