import { Controller, Request, Param, Post, Logger, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { HikooResponse } from '../../share/dto/generic.dto';
import { CheckInService } from './checkin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('checkin')
@Controller('checkin')
export class CheckInController {
  constructor(private srv: CheckInService, private _logger: Logger) {
    _logger.setContext(CheckInController.name);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':hikeId')
  @ApiOperation({ summary: 'Send hiker check-in to backend server' })
  @ApiParam({ name: 'hikeId', type: 'number' })
  @ApiResponse({ status: 200, type: HikooResponse, isArray: false, description: 'successful operation' })
  async sendCheckIn(
    @Request() req,
    @Param('hikeId') hikeId: number): Promise<HikooResponse> {
      const userId = req.user.userId;
      this._logger.debug(`@Post CheckIn, hiker=[${userId}], hike=[${hikeId}]`);
      const result = this.srv.sendCheckIn(userId, hikeId);
      this._logger.debug(`@Post CheckIn Result, hiker=[${userId}], result=[${(await result).success}]`);
      return result;
  }
}
