import { Controller, Get, Post, Body, Logger, Param, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Event } from '../../share/models/event.model';
import { EventService } from './event.service';
import { EventsGateway } from '../../web/events/events.gateway';
import { HikooResponse } from '../../share/models/hikoo.model';
import { EventViewDto, EventDto } from 'src/share/dto/event.dto';
import { EventStatusEnum } from 'src/share/entity/event.entity';


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
  @ApiQuery({ name: 'start', type: 'number', required: false })
  @ApiQuery({ name: 'count', type: 'number', required: false })
  @ApiResponse({ status: 200, type: Event, isArray: true, description: 'successful operation' })
  async getEventsByHikeId(
    @Param('userId') userId: number,
    @Query('start') start: number,
    @Query('count') count: number): Promise<EventViewDto[]> {
      this._logger.debug(`@Get, userId = [${userId}], start = [${start}], count = [${count}]`)
      start = (start != null ? start : 0);
      count = (count != null ? count : 10);
      // count must more than 0
      return this.srv.getByHikeId(userId, start || 0, count || 0);
  }


  @Post(':userId/event')
  @ApiOperation({ summary: 'Create new event' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiResponse({ status: 200, type: HikooResponse, description: 'successful operation' })
  async createEvent(@Body() event: EventDto, @Param('userId') userId: number): Promise<HikooResponse> {
    this._logger.debug(`@Post, userId = [${userId}], info: ${event.eventInfo}`);
    event.stat = EventStatusEnum.PENDING;
    return await this.srv.create(event);
  }
}
