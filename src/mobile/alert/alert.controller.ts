import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Alert } from './alert';
import { AlertService } from './alert.service'

@ApiTags('alert')
@Controller('alert')
export class AlertController {
  constructor(private srv: AlertService) { }

  @Get()
  @ApiResponse({ status: 200, type: Alert, isArray: true, description: 'Return alert list' })
  getAlerts() {
    return this.srv.getAlerts();
  }
}
