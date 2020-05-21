import { Controller, Post, Logger, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { HikooResponse } from '../../models/hikoo.model';
import { Location } from '../../models/location.model';
import { LocationService } from './location.service';

@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(private srv: LocationService, private _logger: Logger) {
    _logger.setContext(LocationController.name);
  }

  @Post()
  @ApiOperation({ summary: 'Send hiker location to backend server.' })
  @ApiBody({ type: Location })
  @ApiResponse({ status: 200, type: Location, isArray: false, description: 'Send hiker location successfully' })
  sendLocation(@Body() location: Location): HikooResponse {
    this._logger.debug(location);
    if (this.srv.sendLocation(location)) {
      return { success: true };
    } else {
      return { success: false, errorMessage: 'Fail to send hiker location' };
    }
  }
}
