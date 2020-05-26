import { ApiProperty } from '@nestjs/swagger';
import { AlertEntity } from '../entity/alert.entity';

export class AlertDto {
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
    eventEnd: Date;
    
    @ApiProperty({nullable: false})
    permitId: number;
    
    @ApiProperty({nullable: false})
    latpt: number;
    
    @ApiProperty({nullable: false})
    lngpt: number;
    
    @ApiProperty({nullable: false})
    radius: number;
    
    @ApiProperty({nullable: false})
    creatorId: number;

    @ApiProperty({description: 'id of the event to be upgraded into alert', nullable: true})
    originEventId: number;
    
    @ApiProperty({description: 'auto generated on create', nullable: true})
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
        it.creator.id = this.creatorId;
        it.originSource.id = this.originEventId;
        it.logtime = this.logtime;
        
        return it;
    }

    public static fromEntity(entity: AlertEntity): AlertDto {
        const it = new AlertDto();
        it.id = entity.id;
        it.eventTypeId = entity.eventTypeId;
        it.alertLevelId = entity.alertLevelId;
        it.eventInfo = entity.eventInfo;
        it.eventTime = entity.eventTime;
        it.eventEnd = entity.eventEnd;
        it.permitId = entity.permitId;
        it.latpt = entity.latpt;
        it.lngpt = entity.lngpt;
        it.radius = entity.radius;
        it.creatorId = entity.creatorId;
        it.originEventId = entity.originSourceId;
        it.logtime = entity.logtime;

        return it;
    }
}

export class AlertViewDto extends AlertDto {
    @ApiProperty()
    eventTypeName: string;
  
    @ApiProperty()
    alertLevelName: string;
    
    @ApiProperty()
    permitName: string;
    
    @ApiProperty()
    creatorName: string;

    public static fromEntity(entity: AlertEntity): AlertViewDto {
        const it = new AlertViewDto();
        it.id = entity.id;
        it.eventTypeId = entity.eventTypeId;
        it.eventTypeName = entity.eventType.name;
        it.alertLevelId = entity.alertLevelId;
        it.alertLevelName = entity.alertLevel.name;
        it.eventInfo = entity.eventInfo;
        it.eventTime = entity.eventTime;
        it.eventEnd = entity.eventEnd;
        it.permitId = entity.permit.id;
        it.latpt = entity.latpt;
        it.lngpt = entity.lngpt;
        it.radius = entity.radius;
        it.creatorId = entity.creatorId;
        it.creatorName = entity.creator.name;
        it.originEventId = entity.originSourceId;
        it.logtime = entity.logtime;

        return it;
    }
}
