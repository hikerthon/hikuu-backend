import { Controller, Logger, Get, Put, Param, Body, Req, Query} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermitView } from '../models/permit.model';
import { PermitService } from './permit.service';
import { HikooResponse } from '../models/hikoo.model';
import { Example } from '../example/example.controller';

@ApiTags('permit')
@Controller('permit')
export class PermitController {

  constructor(private permitSvc: PermitService, private _logger: Logger) {
    _logger.setContext(PermitController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get permit list' })
  @ApiQuery({ name: 'permits', type: 'string' })
  @ApiQuery({ name: 'hikers', type: 'string' })
  @ApiResponse({ status: 200, type: PermitView, isArray: true, description: 'Get permit list' })
  getPermit(@Query('permits') permits: string,
            @Query('hikers') hikers: string ): PermitView[] {
    this._logger.debug(`Query args = ${permits}`);
    this._logger.debug(`hikers args = ${hikers}`);
    return this.permitSvc.getFakePermits();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get permit info' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, type: PermitView, description: 'Get permit info' })
  getPermitById(@Param('id') id: string): PermitView {
    this._logger.debug(`get permit id [${id}]`);
    return this.permitSvc.getFakePermit();
  }


}
