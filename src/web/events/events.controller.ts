import { ApiResponse, ApiBody, ApiProperty, ApiParam, ApiTags, ApiOperation, ApiQuery, } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Logger, Param, Put, Query } from '@nestjs/common';
import { EventsService } from "./events.service";
import { HikooResponse } from '../../share/models/hikoo.model';
import { EventDto } from 'src/share/dto/event.dto';

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
    @ApiQuery({ name: 'startIndex', type: 'number', required: false })
    @ApiQuery({ name: 'count', type: 'number', required: false })
    @ApiResponse({ status: HttpStatus.OK, type: EventDto, isArray: true, description: 'Return list of event' })
    getAllEvent(@Query('startIndex') startIndex: number,
                @Query('count') count: number): EventDto[] {
        this._logger.debug(`Get event list, startIndex = [${startIndex}], count = [${count}]`)
        // return this.evSvc.getAllEvent(startIndex, count);
        return null;
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
    @ApiResponse({ status: HttpStatus.OK, type: EventDto, isArray: false, description: 'Return event detail' })
    getEvent(@Param('id') id: number): EventDto {
        this._logger.debug(`EventId = [${id}]`)
        // return this.evSvc.getEventById(id)
        return null;
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
