import { ApiProperty } from '@nestjs/swagger';
import { EventEntity } from '../entity/event.entity';

export class EventDto {
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    eventType: number;
  
    @ApiProperty()
    alertLevel: number;
    
    @ApiProperty()
    eventInfo: string;
    
    @ApiProperty()
    eventTime: Date;
    
    @ApiProperty()
    hikeId: number;
    
    @ApiProperty()
    latpt: number;
    
    @ApiProperty()
    lngpt: number;
    
    @ApiProperty()
    radius: number;
    
    @ApiProperty()
    reporterId: number;

    @ApiProperty({enum: ['PENDING', 'PROCESSING', 'RESOLVED', 'BAD']})
    stat: string;
    
    @ApiProperty()
    logtime: Date;

    public toEntity():EventEntity {
        const it = new EventEntity();
        it.id = this.id;
        it.eventType.id = this.eventType;
        it.alertLevel.id = this.alertLevel;
        it.eventInfo = this.eventInfo;
        it.eventTime = this.eventTime;
        it.hike.id = this.hikeId;
        it.latpt = this.latpt;
        it.lngpt = this.lngpt;
        it.radius = this.radius;
        it.reporter.id = this.reporterId;
        it.stat = this.stat;
        it.logtime = this.logtime;
        return it;
    }

    public static fromEntity(entity: EventEntity): EventDto {
        const it = new EventDto();
        it.id = entity.id;
        it.eventType = entity.eventType.id;
        it.alertLevel = entity.alertLevel.id;
        it.eventInfo = entity.eventInfo;
        it.eventTime = entity.eventTime;
        it.hikeId = entity.hike.id;
        it.latpt = entity.latpt;
        it.lngpt = entity.lngpt;
        it.radius = entity.radius;
        it.reporterId = entity.reporter.id;
        it.stat = entity.stat;
        it.logtime = entity.logtime;

        return it;
    }
}