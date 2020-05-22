import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Event } from './event';
import { EventService } from './event.service';
import { EventsGateway } from 'src/web/events/events.gateway';
import { HikooResponse } from 'src/models/hikoo.model';

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(
    private srv: EventService,
    private eventGateway: EventsGateway
  ) { }

  @Get()
  @ApiResponse({ status: 200, type: Event, isArray: true, description: 'Return events' })
  getEvents() {
    return this.srv.getEvents();
  }

  @Post()
  @ApiResponse({ status: 200, type: HikooResponse, description: 'Create new event successful' })
  createEvent(@Body() event: Event): HikooResponse {
    const r = this.srv.createEvent(event);
    // TODO: check response

    this.eventGateway.newTest('fuck');

    return { success: true };
  }
}
