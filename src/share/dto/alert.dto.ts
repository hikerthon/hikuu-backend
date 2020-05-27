import { ApiProperty } from '@nestjs/swagger';
import { AlertEntity, AlertAttachmentEntity } from '../entity/alert.entity';
import { IsNumber, Max, MIN, Min, IsDate, MaxLength, IsString, IsDateString } from 'class-validator';

export class AlertAttachmentDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    alertId: number;

    @ApiProperty({isArray: true})
    imagePath: string[]


    public static fromEntity(entity: AlertAttachmentEntity[]): AlertAttachmentDto {
        const it = new AlertAttachmentDto();
        it.imagePath = []
        entity.forEach(element => {
            it.imagePath.push(element.imagePath)
        });
        return it;
    }
}

export class AlertDto {
    @ApiProperty({description: 'auto generated on create', nullable: true, readOnly: true})
    id: number;
  
    @ApiProperty({nullable: false, minimum: 1, maximum: 4, example: 1})
    @IsNumber()
    @Min(1)
    @Max(4)
    eventTypeId: number;
  
    @ApiProperty({nullable: false, minimum: 1,maximum: 4, example: 1})
    @IsNumber()
    @Min(1)
    @Max(4)
    alertLevelId: number;
    
    @ApiProperty({maxLength: 255,nullable: false, example: 'This is eventInfo'})
    @MaxLength(255)
    @IsString()
    eventInfo: string;
    
    @ApiProperty({nullable: false})
    @IsDateString()
    eventTime: Date;
    
    @ApiProperty({nullable: false})
    @IsDateString()
    eventEnd: Date;
    
    @ApiProperty({nullable: false, example: 1})
    permitId: number;
    
    @ApiProperty({nullable: false, minimum: -90, maximum: 90, example: 24.769752})
    @IsNumber()
    @Min(-90)
    @Max(90)
    latpt: number;
    
    @ApiProperty({nullable: false, minimum: -180, maximum: 180, example: 120.9993924})
    @IsNumber()
    @Min(-180)
    @Max(180)
    lngpt: number;
    
    @ApiProperty({minimum: 0, maximum: 100, nullable: false, example: 5})
    @IsNumber()
    @Min(0)
    @Max(100)
    radius: number;
    
    @ApiProperty({description: 'station id', nullable: false, example: 1})
    @IsNumber()
    creatorId: number;

    @ApiProperty({description: 'id of the event to be upgraded into alert', nullable: true})
    originEventId: number;

    @ApiProperty()
    attachments: string[];
    
    @ApiProperty({description: 'auto generated on create', nullable: true, readOnly: true})
    logtime: Date;

    public toEntity(): AlertEntity {
        const it = new AlertEntity();
        it.eventTypeId = this.eventTypeId;
        it.alertLevelId = this.alertLevelId;
        it.eventInfo = this.eventInfo;
        it.eventTime = this.eventTime;
        it.eventEnd = this.eventEnd;
        it.permitId = this.permitId;
        it.latpt = this.latpt;
        it.lngpt = this.lngpt;
        it.radius = this.radius;
        it.creatorId = this.creatorId;
        it.originSourceId = (this.originEventId ? this.originEventId : null);
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
        const imagePaths = AlertAttachmentDto.fromEntity(entity.attachments)
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
        it.attachments = imagePaths.imagePath
        return it;
    }
}
