import { ApiResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { EventsService } from "./events.service";

export class Events {
    @ApiProperty()
    hikeId: number;
  
    @ApiProperty()
    hikerId: number;
  
    @ApiProperty()
    hikerName: string;
  
    @ApiProperty()
    location: string;
    
    @ApiProperty()
    radius: number;

    @ApiProperty()
    alertId: number;

    @ApiProperty()
    alertLevel: string;

    @ApiProperty()
    eventId: number;

    @ApiProperty()
    eventType: string;

    @ApiProperty()
    eventInfo: string;

    @ApiProperty()
    eventTime: string;

    @ApiProperty()
    ttl: number;
}

@ApiTags('events')
@Controller('events')
export class EventsController {
    constructor(private evSvc: EventsService) {}

    @Get()
    @ApiResponse({ status: 200, type: Events, isArray: true, description: 'Return list of event' })
    getAllEvent() {
        return this.evSvc.getAllEvent();
    }
}
