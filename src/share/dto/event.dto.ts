import { ApiProperty } from '@nestjs/swagger';
import { EventEntity, EventStatusEnum } from '../entity/event.entity';

export class EventDto {
    @ApiProperty({description: 'auto generated on create', nullable: true})
    id: number;
  
    @ApiProperty({nullable: false})
    eventTypeId: number;
  
    @ApiProperty({nullable: false})
    alertLevelId: number;
    
    @ApiProperty({nullable: false})
    eventInfo: string;
    
    @ApiProperty({nullable: false})
    eventTime: Date;
    
    @ApiProperty({nullable: false})
    hikeId: number;
    
    @ApiProperty({nullable: false})
    latpt: number;
    
    @ApiProperty({nullable: false})
    lngpt: number;
    
    @ApiProperty({nullable: false})
    radius: number;
    
    @ApiProperty({nullable: false})
    reporterId: number;

    @ApiProperty({enum: EventStatusEnum, default: EventStatusEnum.PENDING, description: 'auto generated on create', nullable: true})
    stat: string;
    
    @ApiProperty({description: 'auto generated on create', nullable: true})
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

export class EventCountDto {

    @ApiProperty({type: Number, default: 0})
    pendingCount: number;

    @ApiProperty({type: Number, default: 0})
    processingCount: number;

    @ApiProperty({type: Number, default: 0})
    resolved: number;

    @ApiProperty({type: Number, default: 0})
    bad: number;

    constructor(pendingCount: number, processingCount: number, resolved: number, bad: number) {
        this.pendingCount = pendingCount;
        this.processingCount = processingCount;
        this.resolved = resolved;
        this.bad = bad;
    }

    public static fromEntity(entity: any): EventCountDto {
        const it = new EventCountDto(0, 0, 0, 0);
        entity.forEach(e => {
            switch (e['stat']) {
                case 'PENDING':
                    it.pendingCount = Number(e['count(*)'])
                    break
                case 'PROCESSING':
                    it.processingCount = Number(e['count(*)'])
                    break
                case 'RESOLVED':
                    it.resolved = Number(e['count(*)'])
                    break
                case 'BAD':
                    it.bad = Number(e['count(*)'])
                    break
            }
        })
        return it;
    }
}