import { ApiResponse, ApiParam, ApiTags, ApiOperation, ApiQuery, } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Logger, Param, Put, Query, Post, Body } from '@nestjs/common';
import { EventService } from "./events.service";
import { HikooResponse } from '../../share/models/hikoo.model';
import { EventDto, EventViewDto } from 'src/share/dto/event.dto';
import { EventStatusEnum } from 'src/share/entity/event.entity';

@ApiTags('event')
@Controller('event')
export class EventsController {
    constructor(
        private eventSvc: EventService,
        private _logger: Logger
    ) {
        _logger.setContext(EventsController.name);
    }

    @Get()
    @ApiOperation({ summary: 'Get event list' })
    @ApiQuery({ name: 'startIndex', type: 'number', required: false })
    @ApiQuery({ name: 'count', type: 'number', required: false })
    @ApiResponse({ status: HttpStatus.OK, type: EventViewDto, isArray: true, description: 'Return list of event' })
    async getAllEvent(
        @Query('startIndex') startIndex: number,
        @Query('count') count: number): Promise<EventViewDto[]> {
            this._logger.debug(`@Get, startIndex = [${startIndex}], count = [${count}]`)
            startIndex = (startIndex != null ? startIndex : 0);
            count = (count != null ? count : 10);
            return this.eventSvc.getAllView(startIndex, count);
    }

    @Get('count')
    @ApiOperation({ summary: 'Get event count '})
    @ApiResponse({ status: HttpStatus.OK, type: Number, description: 'Return count of event' })
    async getAllEventCount(): Promise<number> {
        this._logger.debug(`@Get count`)
        return this.eventSvc.getCount();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get event detail'})
    @ApiParam({ name: 'id', type: 'number' })
    @ApiResponse({ status: HttpStatus.OK, type: EventViewDto, isArray: false, description: 'Return event detail' })
    async getEvent(@Param('id') id: number): Promise<EventViewDto> {
        this._logger.debug(`@Get, id = [${id}]`)
        return this.eventSvc.getViewById(id)
    }

    @Post()
    @ApiOperation({ summary: 'Create new Event' })
    @ApiResponse({ status: 200, type: HikooResponse })
    async createEvent(@Body() event: EventDto): Promise<HikooResponse> {
        this._logger.debug(`@Post, info: ${event.eventInfo}`);
        event.stat = EventStatusEnum.PENDING;
        return await this.eventSvc.create(event);
    }
}
