import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckinService } from './checkin.service';
import { CheckinDto, CheckinTimeByTodayDto } from '../../share/dto/checkin.dto';


@ApiTags('checkin')
@Controller('checkin')
export class CheckinController {
  constructor(private hikesSvc: CheckinService, private _logger: Logger) {
    _logger.setContext(CheckinController.name);
  }

  @Get('/checkinTime/count')
  @ApiOperation({ summary: 'Get checkin-record times by Today' })
  @ApiResponse({ status: 200, type: CheckinTimeByTodayDto, description: 'Return list of checkin-record times' })
  getTodayCheckinTimes() {
    return this.hikesSvc.getTodayCheckinTime();
  }

  @Get(':hikerId')
  @ApiOperation({ summary: 'Get checkin-record by hikerId' })
  @ApiParam({ name: 'hikerId', type: 'number' })
  @ApiResponse({ status: 200, type: CheckinDto, isArray: true, description: 'Return list of checkin-record' })
  getById(@Param('hikerId') hikerId: number) {
    this._logger.debug(`@Get hikes, id = ${hikerId}`)
    return this.hikesSvc.getCheckinRecordById(hikerId);
  }
}
