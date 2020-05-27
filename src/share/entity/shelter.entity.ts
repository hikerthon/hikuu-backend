import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'shelters' })
export class ShelterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'shelter_name' })
  name: string;

  @Column()
  capacity: number;

  @Column()
  latpt: number;

  @Column()
  lngpt: number;
}
