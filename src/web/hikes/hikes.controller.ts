import { Controller, Logger, Get, Query, Param, Put, Body, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

import { HikeViewDto, HikeViewModifyDto } from '../../share/dto/hike.dto';
import { HikesService } from './hikes.service';
import { CountResponseDto, HikooResponse } from '../../share/dto/generic.dto';

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
    this._logger.debug(`@Get, startIndex = ${startIndex}, count = ${count}`);
    return this.hikesSvc.getAllHikes(startIndex, count);
  }

  @Get('/count')
  @ApiOperation({ summary: 'Get hikes count' })
  @ApiResponse({ status: 200, type: CountResponseDto, isArray: true, description: 'Return count of hikes' })
  async getAllHikesCount(): Promise<CountResponseDto> {
    this._logger.debug(`@Get, getAllHikesCount`);
    return this.hikesSvc.getAllHikesCount();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get hikes detail' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, type: HikeViewDto, isArray: true, description: 'Return list of hikes' })
  async getById(@Param('id') id: number): Promise<HikeViewDto> {
    this._logger.debug(`@Get hikes, id = ${id}`);
    return this.hikesSvc.getHikes(id);
  }

  @Get('/byHikerId/:id')
  @ApiOperation({ summary: 'Get hikes detail' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, type: HikeViewDto, isArray: true, description: 'Return list of hikes' })
  async getByHikerId(@Param('id') id: number): Promise<HikeViewDto> {
    this._logger.debug(`@Get getHikeByHikerId, id = ${id}`);
    return this.hikesSvc.getHikeByHikerId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'modify memo context' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @HttpCode(200)
  @ApiBody({ type: HikeViewModifyDto })
  @ApiResponse({ status: 200, type: HikooResponse })
  async modifyById(
    @Param('id') id: number,
    @Body() data: HikeViewModifyDto): Promise<HikooResponse> {
    this._logger.debug(`@Put hikes, id = ${id}, data = ${data}`);
    return this.hikesSvc.modifyHikes([data]);
  }

  @Put()
  @ApiOperation({ summary: 'modify memo context' })
  @HttpCode(200)
  @ApiBody({ type: HikeViewModifyDto, isArray: true })
  @ApiResponse({ status: 200, type: HikooResponse })
  async modifyHike(
    @Body() data: HikeViewModifyDto[]): Promise<HikooResponse> {
    this._logger.debug(`@Put, data = ${data}`);
    return this.hikesSvc.modifyHikes(data);
  }
}
