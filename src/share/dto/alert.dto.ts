import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min, MaxLength, IsString } from 'class-validator';
import { AlertEntity, AlertAttachmentEntity } from '../entity/alert.entity';

export class AlertAttachmentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  alertId: number;

  @ApiProperty({ isArray: true })
  imagePath: string[];

  public static fromEntity(entity: AlertAttachmentEntity[]): AlertAttachmentDto {
    const it = new AlertAttachmentDto();
    it.imagePath = [];
    if (entity) {
      entity.forEach(element => {
        it.imagePath.push(element.imagePath);
      });
    }
    return it;
  }
}

export class AlertDto {
  @ApiProperty({ description: 'auto generated on create', nullable: true, readOnly: true })
  id: number;

  @ApiProperty({ nullable: false, minimum: 1, maximum: 4, example: 1 })
  @IsNumber()
  @Min(1)
  @Max(4)
  eventTypeId: number;

  @ApiProperty({ nullable: false, minimum: 1, maximum: 4, example: 1 })
  @IsNumber()
  @Min(1)
  @Max(4)
  alertLevelId: number;

  @ApiProperty({ maxLength: 255, nullable: false, example: 'This is eventInfo' })
  @MaxLength(255)
  @IsString()
  eventInfo: string;

  @ApiProperty({ description: 'The time of the event happens', nullable: false, example: 1590551269000 })
  @IsNumber()
  eventTime: number;

  @ApiProperty({
    description: 'The time the event is considered finish (not shown in map anymore)',
    nullable: false,
    example: 1590551269000,
  })
  @IsNumber()
  eventEnd: number;

  @ApiProperty({ nullable: false, example: 1 })
  permitId: number;

  @ApiProperty({ nullable: false, minimum: -90, maximum: 90, example: 24.769752 })
  @IsNumber()
  @Min(-90)
  @Max(90)
  latpt: number;

  @ApiProperty({ nullable: false, minimum: -180, maximum: 180, example: 120.9993924 })
  @IsNumber()
  @Min(-180)
  @Max(180)
  lngpt: number;

  @ApiProperty({ minimum: 0, maximum: 100, nullable: true, example: 5, required: false })
  radius: number;

  @ApiProperty({ description: 'station id', nullable: false, example: 1 })
  @IsNumber()
  creatorId: number;

  @ApiProperty({ description: 'id of the event to be upgraded into alert', nullable: true })
  originEventId: number;

  @ApiProperty()
  attachments: string[];

  @ApiProperty({ description: 'Broadcast time. auto generated on create', nullable: true, readOnly: true })
  logtime: number = new Date().getTime();

  public toEntity(): AlertEntity {
    const it = new AlertEntity();
    it.eventTypeId = this.eventTypeId;
    it.alertLevelId = this.alertLevelId;
    it.eventInfo = this.eventInfo;
    it.eventTime = new Date(this.eventTime);
    it.eventEnd = new Date(this.eventEnd);
    it.permitId = this.permitId;
    it.latpt = this.latpt;
    it.lngpt = this.lngpt;
    it.radius = this.radius;
    it.creatorId = this.creatorId;
    it.originSourceId = (this.originEventId ? this.originEventId : null);
    it.logtime = new Date(this.logtime);

    return it;
  }

  public static fromEntity(entity: AlertEntity): AlertDto {
    const it = new AlertDto();
    it.id = entity.id;
    it.eventTypeId = entity.eventTypeId;
    it.alertLevelId = entity.alertLevelId;
    it.eventInfo = entity.eventInfo;
    it.eventTime = new Date(entity.eventTime).getTime();
    it.eventEnd = new Date(entity.eventEnd).getTime();
    it.permitId = entity.permitId;
    it.latpt = Number(entity.latpt);
    it.lngpt = Number(entity.lngpt);
    it.radius = Number(entity.radius);
    it.creatorId = entity.creatorId;
    it.originEventId = entity.originSourceId;
    it.logtime = new Date(entity.logtime).getTime();

    return it;
  }
}

export class AlertViewDto extends AlertDto {
  @ApiProperty()
  eventTypeName: string;

  @ApiProperty()
  permitName: string;

  @ApiProperty()
  creatorName: string;

  public static fromEntity(entity: AlertEntity): AlertViewDto {
    const it = new AlertViewDto();
    const imagePaths = AlertAttachmentDto.fromEntity(entity.attachments);
    it.id = entity.id;
    it.eventTypeId = entity.eventTypeId;
    it.eventTypeName = entity.eventType.name;
    it.alertLevelId = entity.alertLevelId;
    it.eventInfo = entity.eventInfo;
    it.eventTime = new Date(entity.eventTime).getTime();
    it.eventEnd = new Date(entity.eventEnd).getTime();
    it.permitId = entity.permit.id;
    it.latpt = Number(entity.latpt);
    it.lngpt = Number(entity.lngpt);
    it.radius = Number(entity.radius);
    it.creatorId = entity.creatorId;
    it.creatorName = entity.creator.name;
    it.originEventId = entity.originSourceId;
    it.logtime = new Date(entity.logtime).getTime();
    it.attachments = imagePaths.imagePath;
    return it;
  }
}
