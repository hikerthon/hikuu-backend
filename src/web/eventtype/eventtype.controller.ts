import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { EventtypeService } from './eventtype.service';
import { EventTypeDto } from '../../share/dto/eventtype.dto';

@ApiTags('basic')
@Controller('eventtype')
export class EventtypeController {
  constructor(private etSvc: EventtypeService) {
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: EventTypeDto, isArray: true, description: 'Returns all event types' })
  getAlertLevels() {
    return this.etSvc.getAll();
  }

}
