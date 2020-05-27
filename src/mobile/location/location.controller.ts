import { Controller, Post, Logger, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { HikooResponse } from '../../share/dto/generic.dto';
import { LocationService } from './location.service';
import { TrackerDto } from 'src/share/dto/tracker.dto';

@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(private srv: LocationService, private _logger: Logger) {
    _logger.setContext(LocationController.name);
  }

  @Post()
  @ApiOperation({ summary: 'Send hiker location to backend server' })
  @ApiBody({ type: TrackerDto })
  @ApiResponse({ status: 200, type: TrackerDto, isArray: false, description: 'successful operation' })
  async sendLocation(@Body() location: TrackerDto): Promise<HikooResponse> {
    this._logger.debug(`@Post location ${location}`);
    return this.srv.sendLocation(location);
  }
}
