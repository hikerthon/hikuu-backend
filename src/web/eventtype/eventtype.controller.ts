import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { EventtypeService } from "./eventtype.service";
import { EventTypeDto } from '../../share/dto/eventtype.dto'

@ApiTags('basic')
@Controller('eventtype')
export class EventtypeController {
    constructor(private etSvc: EventtypeService) {}

    @Get()
    @ApiResponse({ status: 200, type: EventTypeDto, isArray: true, description: 'Returns all event types' })
    getAlertLevels() {
        return this.etSvc.getAll();
    }

}
