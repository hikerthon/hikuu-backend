import { ApiProperty } from '@nestjs/swagger';
import { HikeEntity, PermitReqStatEnum } from '../entity/hike.entity';
import { AccountDto } from './account.dto';
import { TrailDto } from './trail.dto';
import { IsNumber, IsDate, IsString, IsEnum, MaxLength, Max, IsDateString } from 'class-validator';
import { Example } from 'src/example/example.controller';

export class HikeDto {
    @ApiProperty(
        {description: 'auto generated on create', 
        nullable: true, 
        readOnly: true})
    id: number;
  
    @ApiProperty({nullable: false})
    @IsNumber()
    hikerId: number;
  
    @ApiProperty({nullable: false, example: 1590361200000})
    @IsNumber()
    hikeStart: number;
    
    @ApiProperty({nullable: false, example: 1590361200000})
    @IsNumber()
    hikeEnd: number;
    
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
    
    @ApiProperty({nullable: false, example: 1590361200000})
    @IsNumber()
    acceptedTime: number;
    
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
    @IsNumber()
    logtime: number;

    public static fromEntity(entity: HikeEntity): HikeDto {
        const it = new HikeDto();
        it.id = entity.id;
        it.hikerId = entity.hiker.id;
        it.hikeStart = new Date(entity.hikeStart).getTime();
        it.hikeEnd = new Date(entity.hikeEnd).getTime();
        it.permitId = entity.permit.id;
        it.guideName = entity.guideName;
        it.guideContact = entity.guideContact;
        it.guideContact2 = entity.guideContact2;
        it.permitAccepted = entity.permitAccepted;
        it.acceptedTime = new Date(entity.acceptedTime).getTime();
        it.memo = entity.memo;
        it.hikeStarted = entity.hikeStarted;
        it.hikeFinished = entity.hikeFinished;
        it.hikeCancelled = entity.hikeCancelled;
        it.logtime = new Date(entity.logtime).getTime();

        return it;
    }
}

export class HikeViewDto extends HikeDto {

    @ApiProperty({type: AccountDto})
    hikerInfo: AccountDto;

    @ApiProperty({type: [TrailDto]})
    trails: TrailDto[];

    public static fromEntity(entity: HikeEntity): HikeViewDto {
        const it = new HikeViewDto();
        const trails = entity.trails.map(trail => TrailDto.fromEntity(trail))
        const hikerInfo = AccountDto.fromEntity(entity.hiker)
        it.hikerInfo = hikerInfo;
        it.id = entity.id
        it.hikeStart = new Date(entity.hikeStart).getTime();
        it.hikeEnd = new Date(entity.hikeEnd).getTime();
        it.permitId = entity.permit.id;
        it.guideName = entity.guideName;
        it.guideContact = entity.guideContact;
        it.guideContact2 = entity.guideContact2;
        it.permitAccepted = entity.permitAccepted;
        it.acceptedTime = new Date(entity.acceptedTime).getTime();
        it.memo = entity.memo;
        it.hikeStarted = entity.hikeStarted;
        it.hikeFinished = entity.hikeFinished;
        it.hikeCancelled = entity.hikeCancelled;
        it.logtime = new Date(entity.logtime).getTime();
        it.trails = trails;
        return it;
    }
}

export class HikeViewModifyDto {
    @ApiProperty()
    hikeId: number

    @ApiProperty()
    memo: string
}