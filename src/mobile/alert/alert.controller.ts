import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Alerts } from '../../models/alert.model';
import { AlertService } from './alert.service'


@ApiTags('alert')
@Controller('alert')
export class AlertController {

  constructor(private srv: AlertService, private _logger: Logger) {
    _logger.setContext(AlertController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get all alerts.' })
  @ApiResponse({ status: 200, type: Alerts, isArray: true, description: 'Get alerts successfully' })
  getAlerts(): Alerts[] {
    return this.srv.getAlerts();
  }
}
