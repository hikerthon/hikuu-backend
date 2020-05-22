import { ApiResponse, ApiBody, ApiProperty, ApiParam, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Logger, Param } from '@nestjs/common';
import { EventsService } from "./events.service";
import { Event } from '../../share/models/event.model'

@ApiTags('events')
@Controller('events')
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

    @Get(':id')
    @ApiParam({ name: 'id', type: 'number' })
    @ApiOperation({summary: 'Get event info'})
    @ApiResponse({ status: HttpStatus.OK, type: Event, isArray: false, description: 'Return event info' })
    getEvent(@Param('id') id: number): Event {
        this._logger.debug(`EventId = [${id}]`)
        return this.evSvc.getEventById()
    }
}
