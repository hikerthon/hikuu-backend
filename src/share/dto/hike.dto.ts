import { ApiProperty } from '@nestjs/swagger';
import { HikeEntity } from '../entity/hike.entity';
import { AccountDto } from './account.dto';
import { TrailDto } from './trail.dto';
import { TrailEntity } from '../entity/trail.entity';
import { AccountEntity } from '../entity/account.entity';

export class HikeDto {
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    hikerId: number;
  
    @ApiProperty()
    hikeStart: Date;
    
    @ApiProperty()
    hikeEnd: Date;
    
    @ApiProperty()
    permitId: number;
    
    @ApiProperty()
    guideName: string;
    
    @ApiProperty()
    guideContact: string;
    
    @ApiProperty()
    guideContact2: string;

    @ApiProperty({enum: ['PENDING', 'ACCEPTED', 'REJECTED']})
    permitAccepted: string;
    
    @ApiProperty()
    acceptedTime: Date;
    
    @ApiProperty()
    memo: string;
    
    @ApiProperty()
    hikeStarted: boolean;
    
    @ApiProperty()
    hikeFinished: boolean;
    
    @ApiProperty()
    hikeCancelled: boolean;
    
    @ApiProperty()
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