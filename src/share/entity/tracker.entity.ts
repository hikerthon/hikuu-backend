import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { AccountEntity } from './account.entity';
import { HikeEntity } from './hike.entity';

@Entity({ name: 'tracker' })
export class TrackerEntity {
  @PrimaryColumn({ name: 'hiker_id', nullable: false })
  hikerId: number;

  @OneToOne(type => AccountEntity, { nullable: false })
  @JoinColumn({ name: 'hiker_id' })
  hiker: AccountEntity;

  @Column({ name: 'hike_id', nullable: true })
  hikeId: number;

  @ManyToOne(type => HikeEntity, { nullable: false })
  @JoinColumn({ name: 'hike_id' })
  hike: HikeEntity;

  @Column({ name: 'record_time' })
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

  @Column('time', { name: 'elapsed_time' })
  elapsedTime: Date;

  @CreateDateColumn()
  logtime: Date;
}
