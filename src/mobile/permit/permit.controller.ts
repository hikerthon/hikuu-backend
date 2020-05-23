import { Controller, Logger, Param, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';
import { PermitService } from './permit.service';
import { DataTypeRole, PermitView } from '../../share/models/permit.model';

@ApiTags('permit')
@Controller('user')
export class PermitController {
  constructor(private srv: PermitService, private _logger: Logger) {
    _logger.setContext(PermitController.name);
  }

  @Get(':userId/permit')
  @ApiOperation({ summary: 'Find permits by user id' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiQuery({ name: 'type', enum: DataTypeRole, required: true })
  @ApiResponse({ status: 200, type: PermitView, isArray: true, description: 'successful operation' })
  getPermitsByUser(@Param('userId') userId: number, @Query('type') dataType: DataTypeRole): PermitView[] {
    this._logger.debug(`get permits by user id [${userId}] dataType [${dataType}]`);
    return this.srv.getPermitsByUser(userId, dataType);
  }

  @Get(':userId/permit/:permitId')
  @ApiOperation({ summary: 'Find permit by id' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiParam({ name: 'permitId', type: 'number' })
  @ApiQuery({ name: 'type', enum: DataTypeRole, required: true })
  @ApiResponse({ status: 200, type: PermitView, isArray: false, description: 'successful operation' })
  getPermit(@Param('userId') userId: number, @Param('permitId') permitId: number, @Param('type') dataType: DataTypeRole): PermitView {
    this._logger.debug(`get permit by id [${permitId}] dataType [${dataType}]`);
    return this.srv.getPermit(userId, permitId, dataType);
  }





}
