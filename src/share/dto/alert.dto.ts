import { ApiProperty } from '@nestjs/swagger';
import { AlertEntity } from '../entity/alert.entity';

export class AlertDto {
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
    eventEnd: Date;
    
    @ApiProperty()
    permitId: number;
    
    @ApiProperty()
    latpt: number;
    
    @ApiProperty()
    lngpt: number;
    
    @ApiProperty()
    radius: number;
    
    @ApiProperty()
    creatorId: number;

    @ApiProperty()
    originEventId: number;
    
    @ApiProperty()
    logtime: Date;

    public toEntity():AlertEntity {
        const it = new AlertEntity();
        it.id = this.id;
        it.eventType.id = this.eventTypeId;
        it.alertLevel.id = this.alertLevelId;
        it.eventInfo = this.eventInfo;
        it.eventTime = this.eventTime;
        it.eventEnd = this.eventEnd;
        it.permit.id = this.permitId;
        it.latpt = this.latpt;
        it.lngpt = this.lngpt;
        it.radius = this.radius;
        it.creator = this.creatorId;
        it.originSource.id = this.originEventId;
        it.logtime = this.logtime;
        
        return it;
    }

    public static fromEntity(entity: AlertEntity): AlertDto {
        const it = new AlertDto();
        it.id = entity.id;
        it.eventTypeId = entity.eventType.id;
        it.alertLevelId = entity.alertLevel.id;
        it.eventInfo = entity.eventInfo;
        it.eventTime = entity.eventTime;
        it.eventEnd = entity.eventEnd;
        it.permitId = entity.permit.id;
        it.latpt = entity.latpt;
        it.lngpt = entity.lngpt;
        it.radius = entity.radius;
        it.creatorId = entity.creator;
        it.originEventId = entity.originSource.id;
        it.logtime = entity.logtime;

        return it;
    }
}