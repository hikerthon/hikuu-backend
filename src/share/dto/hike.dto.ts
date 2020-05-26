import { ApiProperty } from '@nestjs/swagger';
import { HikeEntity, PermitReqStatEnum } from '../entity/hike.entity';
import { AccountDto } from './account.dto';
import { TrailDto } from './trail.dto';

export class HikeDto {
    @ApiProperty({description: 'auto generated on create', nullable: true})
    id: number;
  
    @ApiProperty({nullable: false})
    hikerId: number;
  
    @ApiProperty({nullable: false})
    hikeStart: Date;
    
    @ApiProperty({nullable: false})
    hikeEnd: Date;
    
    @ApiProperty({nullable: false})
    permitId: number;
    
    @ApiProperty({nullable: false})
    guideName: string;
    
    @ApiProperty({nullable: false})
    guideContact: string;
    
    @ApiProperty({nullable: false})
    guideContact2: string;

    @ApiProperty({enum: PermitReqStatEnum, default: PermitReqStatEnum.PENDING, description: 'auto generated on create', nullable: true})
    permitAccepted: string;
    
    @ApiProperty({nullable: false})
    acceptedTime: Date;
    
    @ApiProperty({nullable: true})
    memo: string;
    
    @ApiProperty({default: false, nullable: true})
    hikeStarted: boolean;
    
    @ApiProperty({default: false, nullable: true})
    hikeFinished: boolean;
    
    @ApiProperty({default: false, nullable: true})
    hikeCancelled: boolean;
    
    @ApiProperty({description: 'auto generated on create', nullable: true})
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
        it.trails = trails;
        return it;
    }
}