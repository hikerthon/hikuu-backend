import { Controller, Logger, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { TrailService } from './trail.service';
import { TrailDto } from '../../share/dto/trail.dto';

@ApiTags('trail')
@Controller('trail')
export class TrailController {

  constructor(private trailsSvc: TrailService, private _logger: Logger) {
    _logger.setContext(TrailController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get trail list' })
  @ApiResponse({ status: 200, type: TrailDto, isArray: true, description: 'Get trail list' })
  async getAll(): Promise<TrailDto[]> {
    this._logger.debug('get all trail');
    return this.trailsSvc.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get trail info by id' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, type: TrailDto, description: 'Get trail info by id' })
  async getById(@Param('id') id: number): Promise<TrailDto> {
    this._logger.debug(`get trail id [${id}]`);
    return this.trailsSvc.getById(id);
  }
}
