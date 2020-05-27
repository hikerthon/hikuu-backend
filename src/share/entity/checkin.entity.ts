import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { HikeEntity } from './hike.entity';
import { AccountEntity } from './account.entity';

@Entity({ name: 'checkin' })
export class CheckinEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'hiker_id' })
  hikerId: number;

  @ManyToOne(type => AccountEntity, { nullable: false })
  @JoinColumn({ name: 'hiker_id' })
  hiker: AccountEntity;

  @Column({ name: 'hike_id' })
  hikeId: number;

  @ManyToOne(type => HikeEntity, { nullable: false })
  @JoinColumn({ name: 'hike_id' })
  hike: HikeEntity;

  @CreateDateColumn({ name: 'checkin_time' })
  checkinTime: Date;
}
