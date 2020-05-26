import { Controller, Post, Logger, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { HikooResponse } from '../../share/dto/generic.dto';
import { Location } from '../../share/models/location.model';
import { LocationService } from './location.service';

@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(private srv: LocationService, private _logger: Logger) {
    _logger.setContext(LocationController.name);
  }

  @Post()
  @ApiOperation({ summary: 'Send hiker location to backend server' })
  @ApiBody({ type: Location })
  @ApiResponse({ status: 200, type: Location, isArray: false, description: 'successful operation' })
  sendLocation(@Body() location: Location): HikooResponse {
    this._logger.debug(location);
    if (this.srv.sendLocation(location)) {
      return { success: true };
    } else {
      return { success: false, errorMessage: 'Fail to send hiker location' };
    }
  }
}
