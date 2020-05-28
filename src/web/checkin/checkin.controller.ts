import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Logger, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckinService } from './checkin.service';
import { CheckinDto, CheckinCreateDto } from '../../share/dto/checkin.dto';
import { HikooBadReqResponse, HikooResponse } from '../../share/dto/generic.dto';


@ApiTags('checkin')
@Controller('checkin')
export class CheckinController {
  constructor(private checkinSvc: CheckinService, private _logger: Logger) {
    _logger.setContext(CheckinController.name);
  }

  @Get(':hikeId')
  @ApiOperation({ summary: 'Get checkin-record by hikerId' })
  @ApiParam({ name: 'hikeId', type: 'number' })
  @ApiResponse({ status: 200, type: CheckinDto, isArray: true, description: 'Return list of checkin-record' })
  getById(@Param('hikeId') hikeId: number) {
    this._logger.debug(`@Get hikes, id = ${hikeId}`);
    return this.checkinSvc.getCheckinRecordById(hikeId);
  }

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Create new Checkin record' })
  @ApiResponse({ status: HttpStatus.OK, type: HikooResponse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HikooBadReqResponse })
  async createAlert(@Body() checkin: CheckinCreateDto): Promise<HikooResponse> {
    try {
      this._logger.debug(`@Post, info: ${checkin.hikerId}, ${checkin.hikeId}`);
      await this.checkinSvc.create(checkin);
      return { success: true };
    } catch (e) {
      throw new HttpException({ success: false, errorMessage: e.message }, HttpStatus.BAD_REQUEST);
    }
  }
}
