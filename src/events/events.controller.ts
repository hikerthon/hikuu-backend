import { ApiResponse, ApiBody, ApiProperty, ApiParam, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { EventsService } from "./events.service";

export class Events {
    @ApiProperty()
    hike_id: number;
  
    @ApiProperty()
    hiker_id: number;
  
    @ApiProperty()
    hiker_name: string;
  
    @ApiProperty()
    location: string;
    
    @ApiProperty()
    radius: number;

    @ApiProperty()
    alert_id: number;

    @ApiProperty()
    alert_level: string;

    @ApiProperty()
    event_id: number;

    @ApiProperty()
    event_type: string;

    @ApiProperty()
    event_info: string;

    @ApiProperty()
    event_time: string;

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
