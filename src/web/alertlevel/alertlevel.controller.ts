import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AlertlevelService } from './alertlevel.service';
import { AlertLevelDto } from '../../share/dto/alertlevel.dto';
import { HikooBadReqResponse } from '../../share/dto/generic.dto';

@ApiTags('basic')
@Controller('alertlevel')
export class AlertlevelController {
  constructor(private alSvc: AlertlevelService) {
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: AlertLevelDto, isArray: true, description: 'Returns all alert level' })
  getAlertLevels() {
    return this.alSvc.getAll();
  }
}
