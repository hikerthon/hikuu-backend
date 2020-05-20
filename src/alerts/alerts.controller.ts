import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { Alerts, CreateAlert } from '../models/alert.model'
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
    @ApiOperation({ summary: 'Create new Alert' })
    @ApiResponse({ status: 200, type: HikooResponse })
    createAlert(@Body() alert: CreateAlert): HikooResponse {
        this._logger.debug(alert);
        return { success: true };
    }
}
