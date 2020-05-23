import { Controller, Get, Post, Body, Logger, Param } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Event } from '../../share/models/event.model';
import { EventService } from './event.service';

import { EventsGateway } from '../../web/events/events.gateway';
import { HikooResponse } from '../../share/models/hikoo.model';


@ApiTags('event')
@Controller('user')
export class EventController {
  constructor(
    private srv: EventService,
    private eventGateway: EventsGateway,
    private _logger: Logger
  ) { _logger.setContext(EventController.name); }

  @Get(':userId/event')
  @ApiOperation({ summary: 'Find events by user id' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiResponse({ status: 200, type: Event, isArray: true, description: 'successful operation' })
  getEvents(@Param('userId') userId: number) {
    return this.srv.getEvents(userId);
  }

  @Post(':userId/event')
  @ApiOperation({ summary: 'Add new event' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiResponse({ status: 200, type: HikooResponse, description: 'successful operation' })
  createEvent(@Body() event: Event, @Param('userId') userId: number): HikooResponse {
    const r = this.srv.createEvent(userId, event);
    // TODO: check response
    if (r) {
      const msg = 'publish message'
      this.eventGateway.newTest(msg);
      return { success: true }
    } else {
      return { success: true, errorMessage: 'Fail to add event' }
    }
  }
}
