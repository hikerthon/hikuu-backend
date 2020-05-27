import { Controller, Request, Post, Logger, Body, HttpCode, HttpStatus, UseGuards, HttpException } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HikooResponse } from '../../share/dto/generic.dto';
import { LocationService } from './location.service';
import { TrackerDto } from 'src/share/dto/tracker.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(private srv: LocationService, private _logger: Logger) {
    _logger.setContext(LocationController.name);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send hiker location to backend server' })
  @ApiResponse({ status: HttpStatus.OK, type: TrackerDto, isArray: false, description: 'successful operation' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: HikooResponse, description: 'Error: Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: HikooResponse, description: 'Fail to send hiker location to backend server' })
  async sendLocation(
    @Request() req,
    @Body() location: TrackerDto
  ): Promise<HikooResponse> {
    location.hikerId = req.user.userId;
    this._logger.debug(`@Post location ${location}`);
    const result = await this.srv.sendLocation(location);
    if (!result.success) {
      throw new HttpException(
        { success: false, errorMessage: result.errorMessage },
        HttpStatus.FORBIDDEN
      );
    }
    return result;
  }
}
