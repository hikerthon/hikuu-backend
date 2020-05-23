import { Controller, Logger, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermitService } from './permit.service';
import { PermitDto } from 'src/share/dto/permit.dto';

@ApiTags('permit')
@Controller('permit')
export class PermitController {

  constructor(private permitSvc: PermitService, private _logger: Logger) {
    _logger.setContext(PermitController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get permit list' })
  @ApiResponse({ status: 200, type: PermitDto, isArray: true, description: 'Get permit list' })
  async getAll(): Promise<PermitDto[]> {
    this._logger.debug('get all permit');
    return this.permitSvc.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get permit info' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, type: PermitDto, description: 'Get permit info' })
  async getById(@Param('id') id: number): Promise<PermitDto> {
    this._logger.debug(`get permit id [${id}]`);
    return this.permitSvc.getById(id);
  }


}
