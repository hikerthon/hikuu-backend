import { ApiProperty } from '@nestjs/swagger';
import { Max, Min, IsNumber, IsString, IsEnum, MaxLength } from 'class-validator';
import { EventEntity, EventStatusEnum } from '../entity/event.entity';
import exp = require('constants');

export class EventDto {
  @ApiProperty({
    description: 'auto generated on create',
    nullable: true,
    required: false,
    readOnly: true,
  })
  id: number;


  @ApiProperty({ nullable: false, minimum: 1, maximum: 4, example: 1 })
  @Min(1)
  @Max(4)
  @IsNumber()
  eventTypeId: number;

  @ApiProperty({ nullable: false, minimum: 1, maximum: 4, example: 1 })
  @IsNumber()
  @Min(1)
  @Max(4)
  alertLevelId: number;

  @ApiProperty({ maxLength: 255, nullable: false, example: 'This is eventInfo' })
  @IsString()
  @MaxLength(255)
  eventInfo: string;

  @ApiProperty({ nullable: false, example: 1590486778000 })
  @IsNumber()
  eventTime: number;

  @ApiProperty({ nullable: false, example: 1 })
  @IsNumber()
  hikeId: number;

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

  @ApiProperty({ minimum: 0, maximum: 100, nullable: false, default: 5, required: false })
  @IsNumber()
  @Min(0)
  @Max(100)
  radius: number;

  @ApiProperty({ nullable: false, example: 1, required: false })
    // @IsNumber()
  reporterId: number;

  @ApiProperty({
    enum: EventStatusEnum,
    default: EventStatusEnum.PENDING,
    description: 'auto generated on create',
    nullable: true,
    required: false,
  })
    // @IsEnum(EventStatusEnum)
  stat: string;

  @ApiProperty({ description: 'auto generated on create', nullable: true, readOnly: true })
  logtime: number;

  @ApiProperty()
  attachments: string[];

  public toEntity(): EventEntity {
    const it = new EventEntity();
    it.id = this.id;
    it.eventTypeId = this.eventTypeId;
    it.alertLevelId = this.alertLevelId;
    it.eventInfo = this.eventInfo;
    it.eventTime = new Date(this.eventTime);
    it.hikeId = this.hikeId;
    it.latpt = this.latpt;
    it.lngpt = this.lngpt;
    it.radius = this.radius;
    it.reporterId = this.reporterId;
    it.stat = this.stat;
    return it;
  }

  public static fromEntity(entity: EventEntity): EventDto {
    const it = new EventDto();
    it.id = entity.id;
    it.eventTypeId = entity.eventTypeId;
    it.alertLevelId = entity.alertLevelId;
    it.eventInfo = entity.eventInfo;
    it.eventTime = new Date(entity.eventTime).getTime();
    it.hikeId = entity.hikeId;
    it.latpt = entity.latpt;
    it.lngpt = entity.lngpt;
    it.radius = entity.radius;
    it.reporterId = entity.reporterId;
    it.stat = entity.stat;
    it.logtime = new Date(entity.logtime).getTime();
    ;
    return it;
  }
}

export class EventViewDto extends EventDto {

  @ApiProperty()
  eventTypeName: string;

  @ApiProperty()
  reporterName: string;

  public static fromEntity(entity: EventEntity): EventViewDto {
    const it = new EventViewDto();
    it.id = entity.id;
    it.eventTypeId = entity.eventTypeId;
    it.eventTypeName = entity.eventType.name;
    it.alertLevelId = entity.alertLevelId;
    it.eventInfo = entity.eventInfo;
    it.eventTime = new Date(entity.eventTime).getTime();
    it.hikeId = entity.hikeId;
    it.latpt = Number(entity.latpt);
    it.lngpt = Number(entity.lngpt);
    it.radius = Number(entity.radius);
    it.reporterId = entity.reporterId;
    it.reporterName = entity.reporter.firstName;
    it.stat = entity.stat;
    it.logtime = new Date(entity.logtime).getTime();

    const attachments = [];
    if (entity.attachments) {
      entity.attachments.forEach(element => {
        attachments.push(element.imagePath);
      });
    }
    it.attachments = attachments;
    return it;
  }
}

export class EventCountDto {

  @ApiProperty({ type: Number, default: 0 })
  eventTotalCount: number;

  @ApiProperty({ type: Number, default: 0 })
  pendingCount: number;

  @ApiProperty({ type: Number, default: 0 })
  processingCount: number;

  @ApiProperty({ type: Number, default: 0 })
  resolvedCount: number;

  @ApiProperty({ type: Number, default: 0 })
  notResolvedCount: number;

  @ApiProperty({ type: Number, default: 0 })
  bad: number;

  @ApiProperty({ type: Number, default: 0 })
  infoCount: number;

  @ApiProperty({ type: Number, default: 0 })
  cautionCount: number;

  @ApiProperty({ type: Number, default: 0 })
  dangerCount: number;

  @ApiProperty({ type: Number, default: 0 })
  emergencyCount: number;


  constructor(eventTotalCount: number,
              pendingCount: number,
              processingCount: number,
              resolved: number,
              bad: number,
              infoCount: number,
              cautionCount: number,
              dangerCount: number,
              emergencyCount: number) {
    this.eventTotalCount = eventTotalCount;
    this.pendingCount = pendingCount;
    this.processingCount = processingCount;
    this.resolvedCount = resolved;
    this.bad = bad;
    this.infoCount = infoCount;
    this.cautionCount = cautionCount;
    this.dangerCount = dangerCount;
    this.emergencyCount = emergencyCount;
  }

  public static fromRawEntity(raw: any): EventCountDto {
    const it = new EventCountDto(0, 0, 0, 0, 0, 0, 0, 0, 0);
    it.eventTotalCount = Number(raw.eventTotalCount);
    it.pendingCount = Number(raw.eventPendingCount);
    it.resolvedCount = Number(raw.eventResolvedCount);
    it.notResolvedCount = Number(raw.eventNotResolvedCount);
    it.infoCount = Number(raw.infoCount);
    it.cautionCount = Number(raw.cautionCount);
    it.dangerCount = Number(raw.dangerCount);
    it.emergencyCount = Number(raw.emergencyCount);
    return it;
  }
}

export class ModifyEventDto {

  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ApiProperty({ type: Number, example: 1 })
  alertId: number;

  @ApiProperty({ enum: EventStatusEnum, example: EventStatusEnum.RESOLVED })
  @IsEnum(EventStatusEnum)
  stat: string;

}

export class EventSoSDto {

  @ApiProperty()
  eventId: number;

  @ApiProperty()
  hikerId: number;

  @ApiProperty()
  hikerName: string;

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

  public static fromEntity(entity: EventEntity): EventSoSDto {
    const it = new EventSoSDto();
    it.eventId = entity.id;
    it.hikerId = entity.reporter.id;
    it.hikerName = entity.reporter.username;
    it.latpt = entity.latpt;
    it.lngpt = entity.lngpt;
    return it;
  }

}