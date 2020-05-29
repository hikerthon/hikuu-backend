import { Controller, Get, HttpStatus, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { DashboardService } from './dashboard.service';
import { DashboardDto } from '../../share/dto/dashboard.dto';
import { formatDate } from '../../share/utils/utils';

@Controller('dashboard')
@ApiTags('dashboard')
export class DashboardController {
  constructor(private dashboardSvc: DashboardService, private _logger: Logger) {
    _logger.setContext(DashboardController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get count of dashboard' })
  @ApiResponse({ status: HttpStatus.OK, type: DashboardDto, description: 'return each count of dashboard' })
  async getAll(): Promise<DashboardDto> {
    this._logger.debug('Get permit and checkin count');
    return this.dashboardSvc.getAll(new Date(formatDate(new Date(Date.now()))));
  }
}
