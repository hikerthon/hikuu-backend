import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Event } from './event';
import { EventService } from './event.service';

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private srv: EventService) { }

  @Get()
  @ApiResponse({ status: 200, type: Event, isArray: true, description: 'Return events' })
  getEvents() {
    return this.srv.getEvents();
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Create new event successful' })
  createEvent(@Body() event: Event) {
    return this.srv.createEvent(event);
  }
}
