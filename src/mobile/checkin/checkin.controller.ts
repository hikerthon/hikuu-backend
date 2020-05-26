import { Controller, Post, Logger, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HikooResponse } from '../../share/dto/generic.dto';
import { CheckInService } from './checkin.service';
import { CheckinDto } from 'src/share/dto/checkin.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('checkin')
@Controller('checkin')
export class CheckInController {
  constructor(private srv: CheckInService, private _logger: Logger) {
    _logger.setContext(CheckInController.name);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Send hiker checkin to backend server' })
  @ApiBody({ type: CheckinDto })
  // TODO correct response
  @ApiResponse({ status: 200, type: HikooResponse, isArray: false, description: 'successful operation' })
  async sendCheckIn(@Body() checkin: CheckinDto): Promise<HikooResponse> {
    this._logger.debug(checkin);
    return this.srv.sendCheckIn(checkin);
  }
}
