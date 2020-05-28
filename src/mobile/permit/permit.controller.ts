import { Controller, Request, Logger, Param, Get, Query, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { PermitService } from './permit.service';
import { DataTypeRole } from '../../share/models/permit.model';
import { HikeViewDto } from '../../share/dto/hike.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HikooResponse, HikooBadReqResponse } from '../../share/dto/generic.dto';

@ApiBearerAuth()
@ApiTags('permit')
@Controller('permit')
export class PermitController {
  constructor(private srv: PermitService, private _logger: Logger) {
    _logger.setContext(PermitController.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Find this user hiking plans' })
  @ApiQuery({ name: 'type', enum: DataTypeRole, required: false })
  @ApiQuery({ name: 'start', type: 'number', required: false })
  @ApiQuery({ name: 'count', type: 'number', required: false })
  @ApiResponse({ status: HttpStatus.OK, type: HikeViewDto, isArray: true, description: 'successful operation' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: HikooResponse, description: 'Error: Unauthorized' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: HikooBadReqResponse,
    description: 'Invalid start / count supplied',
  })
  async getPermitsByUser(
    @Request() req,
    @Query('type') dataType: DataTypeRole,
    @Query('start') start: string,
    @Query('count') count: string,
  ): Promise<HikeViewDto[]> {
    const userId = req.user.userId;
    const startNum = parseInt(start, 10) || 0
    const countNum = parseInt(count, 10) || 10
    this._logger.debug(`Get Permit userId: ${userId}, dataType: ${dataType}, start: ${startNum}, count: ${countNum}`);

    try {
      // Todo: filter by dataType
      return await this.srv.getByHikerId(userId, startNum, countNum);
    } catch (e) {
      throw new HttpException(
        { success: false, errorMessage: e.errorMessage },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':hikeId')
  @ApiOperation({ summary: 'Get hiking plan detail by id' })
  @ApiParam({ name: 'hikeId', type: 'number' })
  @ApiQuery({ name: 'type', enum: DataTypeRole, required: true })
  @ApiResponse({ status: HttpStatus.OK, type: HikeViewDto, description: 'successful operation' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: HikooResponse, description: 'Error: Unauthorized' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HikooBadReqResponse, description: 'Invalid hikeId supplied' })
  async getPermit(
    @Request() req,
    @Param('hikeId') hikeId: number,
    @Param('type') dataType: DataTypeRole,
  ): Promise<HikeViewDto> {
    const userId = req.user.userId;

    this._logger.debug(`Get Permit userId: ${userId}, dataType: ${dataType}, hikeId: ${hikeId}`);

    try {
      // Todo: filter by dataType
      return await this.srv.FindOneByIds(userId, hikeId);
    } catch (e) {
      throw new HttpException(
        { success: false, errorMessage: e.errorMessage },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
