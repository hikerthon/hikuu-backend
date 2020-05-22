import { ApiResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { EventtypeService } from "./eventtype.service";
import { EventtypeModel } from "../../models/eventtype.model"

@ApiTags('basic')
@Controller('eventtype')
export class EventtypeController {
    constructor(private etSvc: EventtypeService) {}

    @Get()
    @ApiResponse({ status: 200, type: EventtypeModel, isArray: true, description: 'Returns all event types' })
    getAlertLevels() {
        return this.etSvc.getEventTypes();
    }

}
