import { ApiProperty } from '@nestjs/swagger';
import { EventEntity, EventStatusEnum } from '../entity/event.entity';
import { Max, Min, IsNumber, IsString, IsDataURI, IsDate, IsEnum } from 'class-validator';

export class EventDto {
    @ApiProperty({
        description: 'auto generated on create',
        nullable: true,
        required: false,
        readOnly: true
    })
    @IsNumber()
    id: number;

    @ApiProperty({ nullable: false, minimum: 1, maximum: 4 })
    @Min(1)
    @Max(4)
    @IsNumber()
    eventTypeId: number;

    @ApiProperty({ nullable: false, minimum: 1, maximum: 4 })
    @IsNumber()
    @Min(1)
    @Max(4)
    alertLevelId: number;

    @ApiProperty({ nullable: false })
    @IsString()
    eventInfo: string;

    @ApiProperty({ nullable: false })
    @IsDate()
    eventTime: Date;

    @ApiProperty({ nullable: false })
    @IsNumber()
    hikeId: number;

    @ApiProperty({ nullable: false, minimum: -90, maximum: 90 })
    @IsNumber()
    @Min(-90)
    @Max(90)
    latpt: number;

    @ApiProperty({ nullable: false, minimum: -180, maximum: 180 })
    @IsNumber()
    @Min(-180)
    @Max(180)
    lngpt: number;

    @ApiProperty({ nullable: false })
    @IsNumber()
    radius: number;

    @ApiProperty({ nullable: false })
    @IsNumber()
    reporterId: number;

    @ApiProperty({ enum: EventStatusEnum, default: EventStatusEnum.PENDING, description: 'auto generated on create', nullable: true })
    @IsEnum(EventStatusEnum)
    stat: string;

    @ApiProperty({ description: 'auto generated on create', nullable: true, readOnly: true })
    @IsDate()
    logtime: Date;

    public toEntity(): EventEntity {
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

    @ApiProperty({ type: Number, default: 0 })
    pendingCount: number;

    @ApiProperty({ type: Number, default: 0 })
    processingCount: number;

    @ApiProperty({ type: Number, default: 0 })
    resolved: number;

    @ApiProperty({ type: Number, default: 0 })
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