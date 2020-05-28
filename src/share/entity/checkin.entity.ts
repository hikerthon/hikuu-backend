import { Entity, ManyToOne, JoinColumn, CreateDateColumn, PrimaryColumn } from 'typeorm';
import { HikeEntity } from './hike.entity';
import { AccountEntity } from './account.entity';

@Entity({ name: 'checkin' })
export class CheckinEntity {
  @PrimaryColumn({ name: 'hiker_id' })
  hikerId: number;

  @ManyToOne(type => AccountEntity, { nullable: false })
  @JoinColumn({ name: 'hiker_id' })
  hiker: AccountEntity;

  @PrimaryColumn({ name: 'hike_id' })
  hikeId: number;

  @ManyToOne(type => HikeEntity, { nullable: false })
  @JoinColumn({ name: 'hike_id' })
  hike: HikeEntity;

  @CreateDateColumn({ name: 'checkin_time', nullable: true })
  checkinTime: Date;
}
