import { ApiResponse, ApiBody, ApiProperty, ApiParam, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { EventsService } from "./events.service";
import { Event } from '../models/event.model'

@ApiTags('events')
@Controller('events')
export class EventsController {
    constructor(
        private evSvc: EventsService
    ) { }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: Event, isArray: true, description: 'Return list of event' })
    getAllEvent(): Event[] {
        return this.evSvc.getAllEvent();
    }
}
