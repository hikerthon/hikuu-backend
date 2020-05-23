import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "stations" })
export class StationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'station_name'})
    name: string;
}
