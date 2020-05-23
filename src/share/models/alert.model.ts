import { ApiProperty } from '@nestjs/swagger';

export class Alerts {

    @ApiProperty()
    permitId: number;

    @ApiProperty()
    permitName: string;

    @ApiProperty()
    lat: number;

    @ApiProperty()
    lng: number;

    @ApiProperty()
    radius: number;

    @ApiProperty()
    alertLevelId: number;

    @ApiProperty()
    alertLevel: string;

    @ApiProperty()
    eventTypeId: number;

    @ApiProperty()
    eventType: string;

    @ApiProperty()
    eventInfo: string;

    @ApiProperty()
    eventTime: string;

    @ApiProperty()
    ttl: number;

    @ApiProperty()
    stationId: number;

    @ApiProperty()
    stationName: string;

    constructor(permitId: number, permitName: string,
        lat: number, lng: number, radius: number,
        alertLevelId: number, alertLevel: string,
        eventTypeId: number, eventType: string,
        eventInfo: string, eventTime: string, ttl: number,
        stationId: number, stationName: string) {
        this.permitId = permitId;
        this.permitName = permitName;
        this.lat = lat;
        this.lng = lng;
        this.radius = radius;
        this.alertLevelId = alertLevelId;
        this.alertLevel = alertLevel;
        this.eventTypeId = eventTypeId;
        this.eventType = eventType;
        this.eventInfo = eventInfo;
        this.eventTime = eventTime;
        this.ttl = ttl;
        this.stationId = stationId;
        this.stationName = stationName;
    }
}

export class CreateAlert {
    readonly permitId: number;
    readonly location: string;
    readonly radius: number;
    readonly alertLevelId: number;
    readonly eventTypeId: number;
    readonly eventInfo: string;
    readonly eventTime: string;
    readonly ttl: number;
    readonly stationId: number;

    @ApiProperty({ required: false })
    readonly originEventId: number;
}