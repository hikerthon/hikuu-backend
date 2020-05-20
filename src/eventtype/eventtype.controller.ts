import { ApiResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { EventtypeService } from "./eventtype.service";

export class EventType {
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    description: string;
    
    @ApiProperty()
    defAlert: number;
}

@ApiTags('basic')
@Controller('eventtype')
export class EventtypeController {
    constructor(private etSvc: EventtypeService) {}

    @Get()
    @ApiResponse({ status: 200, type: EventType, isArray: true, description: 'Returns all event types' })
    getAlertLevels() {
        return this.etSvc.getEventTypes();
    }

}
