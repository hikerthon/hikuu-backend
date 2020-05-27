import { ApiProperty } from '@nestjs/swagger';
import { AccountEntity, GenderEnum, WatchStatusEnum } from '../entity/account.entity';
import { IsEmail, IsUUID, IsDefined, Max, IsNumber, IsDate, IsString, IsEnum, MaxLength } from 'class-validator';

export class AccountDto {
    @ApiProperty({readOnly: true})
    id: number;
    
    @ApiProperty({maxLength: 255})
    @IsString()
    @MaxLength(255)
    username: string;
    
    
    @ApiProperty({maxLength: 255})
    @IsString()
    @MaxLength(255)
    password: string;

    @ApiProperty({maxLength: 255})
    @IsDefined()
    @IsString()
    @MaxLength(255)
    firstName: string;
    
    @ApiProperty({maxLength: 255})
    @IsDefined()
    @IsString()
    @MaxLength(255)
    lastName: string;

    @ApiProperty()
    image: string;
    
    @ApiProperty({maxLength: 255})
    @IsDefined()
    @MaxLength(255)
    identification: string;
    
    @ApiProperty({enum: GenderEnum, nullable: false})
    @IsDefined()
    gender: string;
    
    @ApiProperty({example: 1590361200000})
    @IsDefined()
    @IsNumber()
    dob: number;
    
    @ApiProperty({maxLength: 255})
    @IsString()
    @MaxLength(255)
    address: string;
    
    @ApiProperty({format: 'email'})
    @IsDefined()
    @IsEmail()
    @MaxLength(255)
    email: string;
    
    @ApiProperty({maxLength: 255})
    @IsString()
    @MaxLength(255)
    nationality: string;
    
    @ApiProperty({maxLength: 255})
    @IsString()
    @MaxLength(255)
    identificationNumber: string;

    @ApiProperty({maxLength: 255})
    @IsString()
    @MaxLength(255)
    homeNumber: string;
    
    @ApiProperty({maxLength: 255})
    @IsString()
    @MaxLength(255)
    mobileNumber: string;
    
    @ApiProperty({maxLength: 255})
    @IsString()
    @MaxLength(255)
    satelliteNumber: string;

    @ApiProperty({maxLength: 255})
    @IsDefined()
    @IsString()
    @MaxLength(255)
    emergencyContact: string;
    
    @ApiProperty({maxLength: 255})
    @IsString()
    @MaxLength(255)
    emergencyNumber: string;
    
    @ApiProperty({maxLength: 255})
    @IsString()
    @MaxLength(255)
    emergencyMobile: string;
    
    @ApiProperty({enum: WatchStatusEnum, nullable: false})
    @IsDefined()
    watchStatus: string;
    
    @ApiProperty({maxLength: 255})
    @IsString()
    @MaxLength(255)
    fcmToken: string;

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
        it.dob = new Date(this.dob);
        it.address = this.address;
        it.email = this.email;
        it.nationality = this.nationality;
        it.identificationNumber = this.identificationNumber;
        it.homeNumber = this.homeNumber;
        it.mobileNumber = this.mobileNumber;
        it.satelliteNumber = this.satelliteNumber;
        it.emergencyContact = this.emergencyContact;
        it.emergencyNumber = this.emergencyNumber;
        it.emergencyMobile = this.emergencyMobile;
        it.watchStatus = this.watchStatus;
        it.fcmToken = this.fcmToken;
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
        it.dob = new Date(entity.dob).getTime();
        it.address = entity.address;
        it.email = entity.email;
        it.nationality = entity.nationality;
        it.identificationNumber = entity.identificationNumber;
        it.homeNumber = entity.homeNumber;
        it.mobileNumber = entity.mobileNumber;
        it.satelliteNumber = entity.satelliteNumber;
        it.emergencyContact = entity.emergencyContact;
        it.emergencyNumber = entity.emergencyNumber;
        it.emergencyMobile = entity.emergencyMobile;
        it.watchStatus = entity.watchStatus;
        it.fcmToken = entity.fcmToken;

        return it;
    }
}