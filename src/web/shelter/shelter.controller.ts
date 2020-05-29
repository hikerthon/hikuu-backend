import { Controller, Logger, Get, Param, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShelterService } from './shelter.service';
import { ShelterDto } from '../../share/dto/shelter.dto';


@ApiTags('shelter')
@Controller('shelter')
export class ShelterController {

  constructor(private shelterSvc: ShelterService, private _logger: Logger) {
    _logger.setContext(ShelterController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get shelter list' })
  @ApiResponse({ status: HttpStatus.OK, type: ShelterDto, isArray: true, description: 'Get shelter list' })
  async getAll(): Promise<ShelterDto[]> {
    this._logger.debug('get all station');
    return this.shelterSvc.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get shelter info by Id' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, type: ShelterDto, description: 'Get shelter info by Id' })
  async getById(@Param('id') id: number): Promise<ShelterDto> {
    this._logger.debug(`get station id [${id}]`);
    return this.shelterSvc.getById(id);
  }

}
