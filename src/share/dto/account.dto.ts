import { ApiProperty } from '@nestjs/swagger';
import { AccountEntity } from '../entity/account.entity';

export class AccountDto {
    @ApiProperty()
    id: number;
    
    @ApiProperty()
    username: string;
    
    @ApiProperty()
    password: string;

    @ApiProperty()
    firstName: string;
    
    @ApiProperty()
    lastName: string;

    @ApiProperty()
    image: string;
    
    @ApiProperty()
    identification: string;
    
    @ApiProperty({enum: ['M', 'F']})
    gender: string;
    
    @ApiProperty()
    dob: Date;
    
    @ApiProperty()
    address: string;
    
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    nationality: string;
    
    @ApiProperty()
    identificationNumber: string;

    @ApiProperty()
    homeNumber: string;
    
    @ApiProperty()
    mobileNumber: string;
    
    @ApiProperty()
    satelliteNumber: string;

    @ApiProperty()
    emergencyContact: string;
    
    @ApiProperty()
    emergencyNumber: string;

    public toEntity():AccountEntity {
        const it = new AccountEntity();
        it.id = this.id;
        it.username = this.username;
        it.password = this.password;
        it.firstName = this.firstName;
        it.lastName = this.lastName;
        it.image = this.image;
        it.identification = this.identification;
        it.gender = this.gender;
        it.dob = this.dob;
        it.address = this.address;
        it.email = this.email;
        it.nationality = this.nationality;
        it.identificationNumber = this.identificationNumber;
        it.homeNumber = this.homeNumber;
        it.mobileNumber = this.mobileNumber;
        it.satelliteNumber = this.satelliteNumber;
        it.emergencyContact = this.emergencyContact;
        it.emergencyNumber = this.emergencyNumber;
        return it;
    }

    public static fromEntity(entity: AccountEntity): AccountDto {
        const it = new AccountDto();
        it.id = entity.id;
        it.username = entity.username;
        it.password = entity.password;
        it.firstName = entity.firstName;
        it.lastName = entity.lastName;
        it.image = entity.image;
        it.identification = entity.identification;
        it.gender = entity.gender;
        it.dob = entity.dob;
        it.address = entity.address;
        it.email = entity.email;
        it.nationality = entity.nationality;
        it.identificationNumber = entity.identificationNumber;
        it.homeNumber = entity.homeNumber;
        it.mobileNumber = entity.mobileNumber;
        it.satelliteNumber = entity.satelliteNumber;
        it.emergencyContact = entity.emergencyContact;
        it.emergencyNumber = entity.emergencyNumber;

        return it;
    }
}