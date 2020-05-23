import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { HikeEntity } from './hike.entity';

@Entity({ name: "account" })
export class AccountEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({name: 'userid'})
    username: string;
    
    @Column({name: 'userpwd'})
    password: string;

    @Column({name: 'first_name'})
    firstName: string;
    
    @Column({name: 'last_name'})
    lastName: string;

    @Column({name: 'selfie_path'})
    image: string;
    
    @Column({name: 'identity_path'})
    identification: string;
    
    @Column('enum', {enum: ['M', 'F']})
    gender: string;
    
    @Column()
    dob: Date;
    
    @Column({name: 'addr'})
    address: string;
    
    @Column()
    email: string;
    
    @Column()
    nationality: string;
    
    @Column({name: 'id_number'})
    identificationNumber: string;
    
    @Column({name: 'home_number'})
    homeNumber: string;
    
    @Column({name: 'mobile_number'})
    mobileNumber: string;
    
    @Column({name: 'satellite_number'})
    satelliteNumber: string;

    @Column({name: 'emergency_contact'})
    emergencyContact: string;
    
    @Column({name: 'emergency_number'})
    emergencyNumber: string;
    
    @OneToMany(type => HikeEntity, hike => hike.hiker)
    hikes: HikeEntity[];
}
