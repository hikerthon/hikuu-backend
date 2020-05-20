import { ApiResponse, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { AlertsService, Alerts } from './alerts.service';
import { HikooResponse } from '../models/hikoo.model';

@ApiTags('alerts')
@Controller('alerts')
export class AlertsController {
    constructor(private alertSvc: AlertsService, private _logger: Logger) {
        _logger.setContext(AlertsController.name);
    }

    @Get()
    @ApiResponse({ status: 200, type: Alerts, isArray: true, description: 'Return list of alert' })
    getAllAlert() {
        return this.alertSvc.getFakeAlerts();
    }

    @Post()
    @ApiBody({ type: Alerts })
    @ApiParam({ name: 'id', type: 'string' })
    createAlert(@Body() alert: Alerts): HikooResponse {
        this._logger.debug(alert);
        return { success: true };
    }
}
