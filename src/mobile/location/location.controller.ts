import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Location } from './location';
import { LocationService } from './location.service';

@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(private srv: LocationService) { }

  @Get()
  @ApiResponse({ status: 200, type: Location, isArray: false, description: 'Return user location' })
  getLocation() {
    this.srv.getLocation();
  }
}
