import { ApiProperty } from '@nestjs/swagger';
import { HikeEntity, PermitReqStatEnum } from '../entity/hike.entity';
import { AccountDto } from './account.dto';
import { TrailDto } from './trail.dto';
import { IsNumber, IsDate, IsString, IsEnum, MaxLength, Max, IsDateString } from 'class-validator';

export class HikeDto {
    @ApiProperty(
        {description: 'auto generated on create', 
        nullable: true, 
        readOnly: true})
    id: number;
  
    @ApiProperty({nullable: false})
    @IsNumber()
    hikerId: number;
  
    @ApiProperty({nullable: false})
    @IsDateString()
    hikeStart: Date;
    
    @ApiProperty({nullable: false})
    @IsDateString()
    hikeEnd: Date;
    
    @ApiProperty({nullable: false})
    permitId: number;
    
    @ApiProperty({maxLength: 255, nullable: false})
    @IsString()
    @MaxLength(255)
    guideName: string;
    
    @ApiProperty({maxLength: 255, nullable: false})
    @IsString()
    @MaxLength(255)
    guideContact: string;
    
    @ApiProperty({maxLength: 255, nullable: false})
    @IsString()
    @MaxLength(255)
    guideContact2: string;

    @ApiProperty({enum: PermitReqStatEnum, default: PermitReqStatEnum.PENDING, description: 'auto generated on create', nullable: true})
    @IsEnum(PermitReqStatEnum)
    permitAccepted: string;
    
    @ApiProperty({nullable: false})
    @IsDateString()
    acceptedTime: Date;
    
    @ApiProperty({maxLength: 255, nullable: true})
    @IsString()
    @MaxLength(255)
    memo: string;
    
    @ApiProperty({default: false, nullable: true})
    hikeStarted: boolean;
    
    @ApiProperty({default: false, nullable: true})
    hikeFinished: boolean;
    
    @ApiProperty({default: false, nullable: true})
    hikeCancelled: boolean;
    
    @ApiProperty({description: 'auto generated on create', nullable: true, readOnly: true})
    logtime: Date;

    public static fromEntity(entity: HikeEntity): HikeDto {
        const it = new HikeDto();
        it.id = entity.id;
        it.hikerId = entity.hiker.id;
        it.hikeStart = entity.hikeStart;
        it.hikeEnd = entity.hikeEnd;
        it.permitId = entity.permit.id;
        it.guideName = entity.guideName;
        it.guideContact = entity.guideContact;
        it.guideContact2 = entity.guideContact2;
        it.permitAccepted = entity.permitAccepted;
        it.acceptedTime = entity.acceptedTime;
        it.memo = entity.memo;
        it.hikeStarted = entity.hikeStarted;
        it.hikeFinished = entity.hikeFinished;
        it.hikeCancelled = entity.hikeCancelled;
        it.logtime = entity.logtime;

        return it;
    }
}

export class HikeViewDto extends HikeDto {

    @ApiProperty()
    hikerName: string;

    @ApiProperty()
    permitName: string;

    @ApiProperty({type: [TrailDto]})
    trails: TrailDto[];

    public static fromEntity(entity: HikeEntity): HikeViewDto {
        const it = new HikeViewDto();
        it.id = entity.id
        it.hikerId = entity.hikerId;
        it.hikerName = entity.hiker.lastName;
        it.hikeStart = entity.hikeStart;
        it.hikeEnd = entity.hikeEnd;
        it.permitId = entity.permit.id;
        it.permitName = entity.permit.name;
        it.guideName = entity.guideName;
        it.guideContact = entity.guideContact;
        it.guideContact2 = entity.guideContact2;
        it.permitAccepted = entity.permitAccepted;
        it.acceptedTime = entity.acceptedTime;
        it.memo = entity.memo;
        it.hikeStarted = entity.hikeStarted;
        it.hikeFinished = entity.hikeFinished;
        it.hikeCancelled = entity.hikeCancelled;
        it.logtime = entity.logtime;

        const trails = entity.trails.map(trail => TrailDto.fromEntity(trail))
        it.trails = trails;

        return it;
    }
}