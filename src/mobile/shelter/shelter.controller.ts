import { Controller, Logger, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ShelterService } from './shelter.service'
import { Shelter } from '../../share/models/shelter.model';

@ApiTags('shelter')
@Controller('shelter')
export class ShelterController {
  constructor(private srv: ShelterService, private _logger: Logger) {
    _logger.setContext(ShelterController.name);
  }

  @Get('')
  @ApiOperation({ summary: 'Get nearby shelters by user id' })
  @ApiQuery({ name: 'userId', type: 'number' })
  @ApiResponse({ status: 200, type: Shelter, isArray: true, description: 'successful operation' })
  getNearbyShelters(@Query('userId') userId: number): Shelter[] {
    this._logger.debug(`Get nearby shelters by user id [${userId}]`);
    return this.srv.getNearbyShelters(userId);
  }





}
