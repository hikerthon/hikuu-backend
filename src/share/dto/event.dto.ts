import { ApiProperty } from '@nestjs/swagger';
import { EventEntity } from '../entity/event.entity';

export class EventDto {
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    eventTypeId: number;
  
    @ApiProperty()
    alertLevelId: number;
    
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
        it.eventTypeId = this.eventTypeId;
        it.alertLevelId = this.alertLevelId;
        it.eventInfo = this.eventInfo;
        it.eventTime = this.eventTime;
        it.hikeId = this.hikeId;
        it.latpt = this.latpt;
        it.lngpt = this.lngpt;
        it.radius = this.radius;
        it.reporterId = this.reporterId;
        it.stat = this.stat;
        it.logtime = this.logtime;
        return it;
    }

    public static fromEntity(entity: EventEntity): EventDto {
        const it = new EventDto();
        it.id = entity.id;
        it.eventTypeId = entity.eventTypeId;
        it.alertLevelId = entity.alertLevelId;
        it.eventInfo = entity.eventInfo;
        it.eventTime = entity.eventTime;
        it.hikeId = entity.hikeId;
        it.latpt = entity.latpt;
        it.lngpt = entity.lngpt;
        it.radius = entity.radius;
        it.reporterId = entity.reporterId;
        it.stat = entity.stat;
        it.logtime = entity.logtime;

        return it;
    }
}

export class EventViewDto extends EventDto {
  
    @ApiProperty()
    eventTypeName: string;
  
    @ApiProperty()
    alertLevelName: string;
    
    @ApiProperty()
    reporterName: string;

    public static fromEntity(entity: EventEntity): EventViewDto {
        const it = new EventViewDto();
        it.id = entity.id;
        it.eventTypeId = entity.eventTypeId;
        it.eventTypeName = entity.eventType.name;
        it.alertLevelId = entity.alertLevelId;
        it.alertLevelName = entity.alertLevel.name;
        it.eventInfo = entity.eventInfo;
        it.eventTime = entity.eventTime;
        it.hikeId = entity.hikeId;
        it.latpt = entity.latpt;
        it.lngpt = entity.lngpt;
        it.radius = entity.radius;
        it.reporterId = entity.reporterId;
        it.reporterName = entity.reporter.firstName;
        it.stat = entity.stat;
        it.logtime = entity.logtime;

        return it;
    }
}