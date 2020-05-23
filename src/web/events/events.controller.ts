import { ApiResponse, ApiBody, ApiProperty, ApiParam, ApiTags, ApiOperation, ApiQuery, } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Logger, Param, Put, Query } from '@nestjs/common';
import { EventsService } from "./events.service";
import { Event } from '../../share/models/event.model'
import { HikooResponse } from '../../share/models/hikoo.model';

@ApiTags('event')
@Controller('event')
export class EventsController {
    constructor(
        private evSvc: EventsService,
        private _logger: Logger
    ) {
        _logger.setContext(EventsController.name);
    }

    @Get()
    @ApiOperation({ summary: 'Get event list' })
    @ApiResponse({ status: HttpStatus.OK, type: Event, isArray: true, description: 'Return list of event' })
    getAllEvent(): Event[] {
        return this.evSvc.getAllEvent();
    }

    @Get('count')
    @ApiOperation({ summary: 'Get event count '})
    @ApiResponse({ status: HttpStatus.OK, type: Number, description: 'Return count of event' })
    getAllEventCount(): number {
        return this.evSvc.getEventCount();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get event detail'})
    @ApiParam({ name: 'id', type: 'number' })
    @ApiResponse({ status: HttpStatus.OK, type: Event, isArray: false, description: 'Return event detail' })
    getEvent(@Param('id') id: number): Event {
        this._logger.debug(`EventId = [${id}]`)
        return this.evSvc.getEventById()
    }

    @Put(':id')
    @ApiOperation({summary: 'Modify event detail'})
    @ApiParam({ name: 'id', type: 'number' })
    @ApiQuery({ name: 'alertLevel', type: 'number', required: true })
    @ApiResponse({ status: HttpStatus.OK, type: HikooResponse, description: 'Modify event object.' })
    ModifyEvent(@Param('id') id:number,
                @Query('alertLevel') alertLevel:number,): HikooResponse {
        this._logger.debug(`Modify Event detail, eventId=[${id}], alertLevel=[${alertLevel}]`)
        return ({ success: true })
    }
}
