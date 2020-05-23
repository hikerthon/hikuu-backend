import { Controller, Logger, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ShelterService } from './shelter.service'
import { ShelterDto } from 'src/share/dto/shelter.dto';

@ApiTags('shelter')
@Controller('shelter')
export class ShelterController {
  constructor(private srv: ShelterService, private _logger: Logger) {
    _logger.setContext(ShelterController.name);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get nearby shelters by hiker id' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiResponse({ status: 200, type: ShelterDto, isArray: true, description: 'Get nearby shelters successfully' })
  getNearbyShelters(@Param('userId') userId: Number): ShelterDto[] {
    this._logger.debug(userId);
    return this.srv.getNearbyShelters(userId);
  }





}
