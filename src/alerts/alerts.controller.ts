import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { AlertsService, Alerts } from "./alerts.service";

@ApiTags('alerts')
@Controller('alerts')
export class AlertsController {
    constructor(private alertSvc: AlertsService) {}

    @Get()
    @ApiResponse({ status: 200, type: Alerts, isArray: true, description: 'Return list of alert' })
    getAllEvent() {
        return this.alertSvc.getFakeAlerts();
    }
}
