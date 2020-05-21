import { ApiResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { EventsService } from "./events.service";
import { Event } from '../models/event.model'

@ApiTags('events')
@Controller('events')
export class EventsController {
    constructor(
        private evSvc: EventsService
    ) { }

    @Get()
    @ApiResponse({ status: 200, type: Event, isArray: true, description: 'Return list of event' })
    getAllEvent() {
        return this.evSvc.getAllEvent();
    }
}
