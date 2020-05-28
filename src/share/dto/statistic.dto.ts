import { ApiProperty } from '@nestjs/swagger';

export class HikeStatisticDto {
    @ApiProperty({description: 'Number of hiking started but not yet finished'})
    hikeActiveCount: number;

    @ApiProperty({description: 'Number of hiking finished'})
    hikeFinishedCount: number;

    @ApiProperty({description: 'Number of hiking cancelled'})
    hikeCancelledCount: number;

    @ApiProperty({description: 'Total count of hiking'})
    hikeTotalCount: number;

    public static fromRawEntity(raw: any) : HikeStatisticDto {
        const it = new HikeStatisticDto();
        it.hikeActiveCount = raw.hikeActiveCount;
        it.hikeFinishedCount = raw.hikeFinishedCount;
        it.hikeCancelledCount = raw.hikeCancelledCount;
        it.hikeTotalCount = raw.hikeTotalCount;

        return it;
    }
}

export class PermitStatisticDto {
    @ApiProperty({description: 'Name of the permit'})
    permitName: string;

    @ApiProperty({description: 'Number of unprocessed permit'})
    pendingCount: number;

    @ApiProperty({description: 'Number of accepted permit'})
    acceptedCount: number;

    @ApiProperty({description: 'Number of rejected permit'})
    rejectedCount: number;

    public static fromRawEntity(raw: any) : PermitStatisticDto {
        const it = new PermitStatisticDto();
        it.permitName = raw.permitName;
        it.pendingCount = raw.pendingCount;
        it.acceptedCount = raw.acceptedCount;
        it.rejectedCount = raw.rejectedCount;

        return it;
    }
}

export class EventStatisticDto {
    @ApiProperty({description: 'Number of event resolved'})
    eventResolvedCount: number;

    @ApiProperty({description: 'Number of event not yet resolved'})
    eventNotResolvedCount: number;

    @ApiProperty({description: 'Total count of event submitted by hiker'})
    eventTotalCount: number;

    public static fromRawEntity(raw: any) : EventStatisticDto {
        const it = new EventStatisticDto();
        it.eventResolvedCount = raw.eventResolvedCount;
        it.eventNotResolvedCount = raw.eventNotResolvedCount;
        it.eventTotalCount = raw.eventTotalCount;

        return it;
    }
}

export class EventTypeStatisticDto {
    @ApiProperty({description: 'Name of the event type', examples: ['Wild Animal', 'Item Found', 'Blocked Route']})
    eventTypeName: string;

    @ApiProperty({description: 'Count of named event'})
    eventTypeCount: number;

    public static fromRawEntity(raw: any) : EventTypeStatisticDto{
        const it = new EventTypeStatisticDto();
        it.eventTypeName = raw.eventTypeName;
        it.eventTypeCount = raw.eventTypeCount;

        return it;
    }
}

export class SosStatisticDto {
    @ApiProperty({description: 'Number of SOS resolved'})
    sosResolvedCount: number;

    @ApiProperty({description: 'Number of SOS currently active'})
    sosNotResolvedCount: number;

    @ApiProperty({description: 'Number of false alarm SOS made'})
    sosFakeCount: number;

    @ApiProperty({description: 'Total count of SOS made'})
    sosTotalCount: number;

    public static fromRawEntity(raw: any) : SosStatisticDto {
        const it = new SosStatisticDto();
        it.sosResolvedCount = raw.sosResolvedCount;
        it.sosNotResolvedCount = raw.sosNotResolvedCount;
        it.sosFakeCount = raw.sosFakeCount;
        it.sosTotalCount = raw.sosTotalCount;

        return it;
    }
}

export class StatisticDto {
    @ApiProperty({description: 'Show count of hiking completion status'})
    hikeCounter: HikeStatisticDto;

    @ApiProperty({description: 'Show count of each permit requested'})
    permitCounter: PermitStatisticDto[];

    @ApiProperty({description: 'Show count of event submitted'})
    eventCounter: EventStatisticDto;

    @ApiProperty({description: 'Show count of each (non SOS) event type'})
    eventTypeCounter: EventTypeStatisticDto[];

    @ApiProperty({description: 'Show count of SOS call'})
    sosCounter: SosStatisticDto;

    @ApiProperty({description: 'Number of Check-In'})
    checkInCounter: number;
}