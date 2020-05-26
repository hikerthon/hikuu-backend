import { Controller, Logger, Get, Query, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { HikeViewDto } from '../../share/dto/hike.dto';
import { HikesService } from './hikes.service'

@ApiTags('hikes')
@Controller('hikes')
export class HikesController {
  constructor(private hikesSvc: HikesService, private _logger: Logger) {
    _logger.setContext(HikesController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get hikes list' })
  @ApiQuery({ name: 'startIndex', type: 'number', required: true })
  @ApiQuery({ name: 'count', type: 'number', required: true })
  @ApiResponse({ status: 200, type: HikeViewDto, isArray: true, description: 'Return list of hikes' })
  async getAllHikes(
    @Query('startIndex') startIndex: number,
    @Query('count') count: number): Promise<HikeViewDto[]> {
      this._logger.debug(`@Get, startIndex = ${startIndex}, count = ${count}`)
      return this.hikesSvc.getAllHikes(startIndex, count)
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get hikes detail' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, type: HikeViewDto, isArray: true, description: 'Return list of hikes' })
  async getById(@Param('id') id: number): Promise<HikeViewDto> {
    this._logger.debug(`@Get hikes, id = ${id}`)
    return this.hikesSvc.getHikes(id);
  }
}
