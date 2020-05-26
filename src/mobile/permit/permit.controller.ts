import { Controller, Logger, Param, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PermitService } from './permit.service';
import { DataTypeRole } from '../../share/models/permit.model';
import { HikeViewDto } from 'src/share/dto/hike.dto';

@ApiTags('permit')
@Controller('user')
export class PermitController {
  constructor(private srv: PermitService, private _logger: Logger) {
    _logger.setContext(PermitController.name);
  }

  @Get(':userId/permit')
  @ApiOperation({ summary: 'Find permits by user id' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiQuery({ name: 'type', enum: DataTypeRole, required: false })
  @ApiQuery({ name: 'start', type: 'number', required: false })
  @ApiQuery({ name: 'count', type: 'number', required: false })
  @ApiResponse({ status: 200, type: HikeViewDto, isArray: true, description: 'successful operation' })
  async getPermitsByUser(
    @Param('userId') userId: number,
    @Query('type') dataType: DataTypeRole,
    @Query('start') start: number,
    @Query('count') count: number,
  ): Promise<HikeViewDto[]> {

    this._logger.debug(`Get Permit userId: ${userId}, dataType: ${dataType}, start: ${start}, count: ${count}`);
    start = (start != null ? start : 0)
    count = (count != null ? count : 10)
    // count need more than 0

    return await this.srv.getByHikerId(userId, start, count)
    // Todo: filter by dataType
  }

  @Get(':userId/permit/:permitId')
  @ApiOperation({ summary: 'Find permit by id' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiParam({ name: 'permitId', type: 'number' })
  @ApiQuery({ name: 'type', enum: DataTypeRole, required: true })
  @ApiResponse({ status: 200, type: HikeViewDto, isArray: false, description: 'successful operation' })
  async getPermit(
    @Param('userId') userId: number,
    @Param('permitId') permitId: number,
    @Param('type') dataType: DataTypeRole
  ): Promise<HikeViewDto> {
    this._logger.debug(`Get Permit userId: ${userId}, dataType: ${dataType}, permitId: ${permitId}`);

    return await this.srv.FindOneByIds(userId, permitId);
    // Todo: filter by dataType
  }

}
