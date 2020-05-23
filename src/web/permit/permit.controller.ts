import { Controller, Logger, Get, Put, Param, Body, Req, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermitService } from './permit.service';

@ApiTags('permit')
@Controller('permit')
export class PermitController {

  constructor(private permitSvc: PermitService, private _logger: Logger) {
    _logger.setContext(PermitController.name);
  }

  // @Get()
  // @ApiOperation({ summary: 'Get permit list' })
  // @ApiQuery({ name: 'dataTypeRole', required: true, enum: DataTypeRole })
  // @ApiQuery({ name: 'permits', type: Number, required: false })
  // @ApiQuery({ name: 'hikers', type: Number, required: false })
  // @ApiResponse({ status: 200, type: PermitView, isArray: true, description: 'Get permit list' })
  // getPermit(@Query('dataTypeRole') dataTypeRole: DataTypeRole,
  //   @Query('permits') permits: number,
  //   @Query('hikers') hikers: number): PermitView[] {
  //   this._logger.debug(`dataTypeRole args = ${dataTypeRole}`)
  //   this._logger.debug(`Query args = ${permits}`);
  //   this._logger.debug(`hikers args = ${hikers}`);
  //   return this.permitSvc.getFakePermits(dataTypeRole, permits, hikers);
  // }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get permit info' })
  // @ApiParam({ name: 'id', type: 'number' })
  // @ApiResponse({ status: 200, type: PermitView, description: 'Get permit info' })
  // getPermitById(@Param('id') id: string): PermitView {
  //   this._logger.debug(`get permit id [${id}]`);
  //   return this.permitSvc.getFakePermit();
  // }


}
