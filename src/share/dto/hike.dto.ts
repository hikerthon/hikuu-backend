import { ApiProperty } from '@nestjs/swagger';
import { HikeEntity } from '../entity/hike.entity';

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

    public toEntity():HikeEntity {
        const it = new HikeEntity();
        it.id = this.id;
        it.hiker.id = this.hikerId;
        it.hikeStart = this.hikeStart;
        it.hikeEnd = this.hikeEnd;
        it.permit.id = this.permitId;
        it.guideName = this.guideName;
        it.guideContact = this.guideContact;
        it.guideContact2 = this.guideContact2;
        it.permitAccepted = this.permitAccepted;
        it.acceptedTime = this.acceptedTime;
        it.memo = this.memo;
        it.hikeStarted = this.hikeStarted;
        it.hikeFinished = this.hikeFinished;
        it.hikeCancelled = this.hikeCancelled;
        it.logtime = this.logtime;
        return it;
    }

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