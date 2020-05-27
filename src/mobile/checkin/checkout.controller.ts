import { Controller, Request, Param, Post, Logger, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { HikooResponse } from '../../share/dto/generic.dto';
import { CheckInService } from './checkin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('checkin')
@Controller('checkout')
export class CheckOutController {
    constructor(private srv: CheckInService, private _logger: Logger) {
      _logger.setContext(CheckOutController.name);
    }
  
    @UseGuards(JwtAuthGuard)
    @Post(':hikeId')
    @ApiOperation({ summary: 'Send hiker check-out to backend server' })
    @ApiParam({ name: 'hikeId', type: 'number' })
    @ApiResponse({ status: 200, type: HikooResponse, isArray: false, description: 'successful operation' })
    async sendCheckOut(
        @Request() req,
        @Param('hikeId') hikeId: number): Promise<HikooResponse> {
            const userId = req.user.userId;
            this._logger.debug(`@Post CheckOut, hiker=[${userId}], hike=[${hikeId}]`);
            const result = this.srv.sendCheckOut(userId, hikeId);
            this._logger.debug(`@Post CheckOut Result, hiker=[${userId}], result=[${(await result).success}]`);
            return result;
    }
}
