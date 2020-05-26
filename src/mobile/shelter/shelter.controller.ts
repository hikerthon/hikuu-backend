import { Controller, Logger, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ShelterService } from './shelter.service'
import { ShelterDto, ShelterAroundMeDto } from 'src/share/dto/shelter.dto';
import { Location } from '../../share/models/location.model';

@ApiTags('shelter')
@Controller('shelter')
export class ShelterController {
  constructor(private srv: ShelterService, private _logger: Logger) {
    _logger.setContext(ShelterController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get 5 nearby shelters from current location' })
  @ApiQuery({ name: 'userId', type: 'number', description: 'user account id', required: true, example: 1 })
  @ApiQuery({ name: 'lat', type: 'number', description: 'latitude value', required: true, example: 23.466305 })
  @ApiQuery({ name: 'lng', type: 'number', description: 'longitude value', required: true, example: 120.949836 })
  @ApiResponse({ status: 200, type: ShelterAroundMeDto, isArray: true, description: 'successful operation' })
  async getNearbyShelters(
    @Query('userId') userId: number,
    @Query('lat') lat: number,
    @Query('lng') lng: number): Promise<ShelterAroundMeDto[]> {
      this._logger.debug(`@Get Shelter around id = [${userId}] at [${lat}, ${lng}]`);
      const location = new Location()
      location.userId = userId;
      location.lat = lat;
      location.lng = lng;
    return this.srv.getNearbyShelters(location);
  }
}
