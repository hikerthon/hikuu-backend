import {
  Controller,
  Logger,
  Get,
  Query,
  Param,
  Put,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

import { HikeDto, HikeModifyDto, HikeViewDto, HikeViewModifyDto } from '../../share/dto/hike.dto';
import { HikesService } from './hikes.service';
import { CountResponseDto, HikooBadReqResponse, HikooResponse } from '../../share/dto/generic.dto';

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
  @ApiResponse({ status: HttpStatus.OK, type: HikeViewDto, isArray: true, description: 'Return list of hikes' })
  async getAllHikes(
    @Query('startIndex') startIndex: number,
    @Query('count') count: number): Promise<HikeViewDto[]> {
    this._logger.debug(`@Get, startIndex = ${startIndex}, count = ${count}`);
    return this.hikesSvc.getAllHikes(startIndex, count);
  }

  @Get('/count')
  @ApiOperation({ summary: 'Get hikes count' })
  @ApiResponse({ status: HttpStatus.OK, type: CountResponseDto, isArray: true, description: 'Return count of hikes' })
  async getAllHikesCount(): Promise<CountResponseDto> {
    this._logger.debug(`@Get, getAllHikesCount`);
    return this.hikesSvc.getAllHikesCount();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get hikes detail' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, type: HikeViewDto, isArray: true, description: 'Return list of hikes' })
  async getById(@Param('id') id: number): Promise<HikeViewDto> {
    this._logger.debug(`@Get hikes, id = ${id}`);
    const result = this.hikesSvc.getHikes(id);
    if (!result) {
      throw new HttpException({ success: false, errorMessage: 'undefined' }, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Get('/byHikerId/:id')
  @ApiOperation({ summary: 'Get hikes detail' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, type: HikeViewDto, isArray: true, description: 'Return list of hikes' })
  async getByHikerId(@Param('id') id: number): Promise<HikeViewDto> {
    this._logger.debug(`@Get getHikeByHikerId, id = ${id}`);
    return this.hikesSvc.getHikeByHikerId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'modify memo context' })
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: HikeViewModifyDto })
  @ApiResponse({ status: HttpStatus.OK, type: HikooResponse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HikooBadReqResponse })
  async modifyById(
    @Param('id') id: number,
    @Body() data: HikeViewModifyDto): Promise<HikooResponse> {
    this._logger.debug(`@Put hikes, id = ${id}, data = ${data}`);
    return this.hikesSvc.modifyHikes([data]);
  }

  @Put()
  @ApiOperation({ summary: 'modify memo context' })
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: HikeViewModifyDto, isArray: true })
  @ApiResponse({ status: HttpStatus.OK, type: HikooResponse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HikooBadReqResponse })
  async modifyHike(
    @Body() data: HikeViewModifyDto[]): Promise<HikooResponse> {
    this._logger.debug(`@Put, data = ${data}`);
    return this.hikesSvc.modifyHikes(data);
  }

  @Post()
  @ApiOperation({ summary: 'Create new hikes by hikerId' })
  @ApiBody({ type: HikeDto })
  @ApiResponse({ status: HttpStatus.OK, type: HikooResponse })
  async insertHikes(@Body() data: HikeDto): Promise<HikooResponse> {
    this._logger.debug(`@Post, data = ` + data);
    const result = await this.hikesSvc.insertHikes(data);
    return result;
  }

  @Put('/acceptHike/:id')
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiOperation({ summary: 'Modify hikes acceptTime by hikerId' })
  @ApiBody({ type: HikeModifyDto })
  @ApiResponse({ status: HttpStatus.OK, type: HikooResponse })
  async modifyHikes(@Param('id') id: number,
                    @Body() data: HikeModifyDto): Promise<HikooResponse> {
    this._logger.debug(`@Put AcceptHike, data = ` + data);
    const result = await this.hikesSvc.modifyHikePermitStatus(data);
    return result;
  }
}
