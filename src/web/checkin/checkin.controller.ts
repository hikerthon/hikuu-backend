import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckinService } from './checkin.service';
import { CheckinDto } from '../../share/dto/checkin.dto';


@ApiTags('checkin')
@Controller('checkin')
export class CheckinController {
  constructor(private hikesSvc: CheckinService, private _logger: Logger) {
    _logger.setContext(CheckinController.name);
  }

  @Get(':hikeId')
  @ApiOperation({ summary: 'Get checkin-record by hikerId' })
  @ApiParam({ name: 'hikeId', type: 'number' })
  @ApiResponse({ status: 200, type: CheckinDto, isArray: true, description: 'Return list of checkin-record' })
  getById(@Param('hikeId') hikeId: number) {
    this._logger.debug(`@Get hikes, id = ${hikeId}`);
    return this.hikesSvc.getCheckinRecordById(hikeId);
  }
}
