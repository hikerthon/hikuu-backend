import { Controller, Get, Logger, Query } from '@nestjs/common';
import { Location } from '../../share/models/location.model';
import { ApiResponse, ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AroundMeService } from './aroundme.service';
import { AroundMeDto } from 'src/share/dto/aroundme.dto';


@ApiTags("aroundme")
@Controller('aroundme')
export class AroundMeController {
  constructor(private srv: AroundMeService, private _logger: Logger) {
    _logger.setContext(AroundMeController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get all event within 3 km around the user' })
  @ApiQuery({ name: 'userId', type: 'number', description: 'user account id', required: true, example: 1 })
  @ApiQuery({ name: 'lat', type: 'number', description: 'latitude value', required: true, example: 23.466305 })
  @ApiQuery({ name: 'lng', type: 'number', description: 'longitude value', required: true, example: 120.949836 })
  @ApiResponse({ status: 200, type: AroundMeDto, description: 'Return list of event and alert within 3km around the user' })
  async getAroundMe(
    @Query('userId') userId: number,
    @Query('lat') lat: number,
    @Query('lng') lng: number): Promise<AroundMeDto[]> {
      this._logger.debug(`@Get AroundMe id = [${userId}] at [${lat}, ${lng}]`);
      const location = new Location()
      location.userId = userId;
      location.lat = lat;
      location.lng = lng;
      return await this.srv.getAroundMe(location)
  }
}
