import { ApiResponse, ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Logger, Query } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { Alerts, CreateAlert } from '../../share/models/alert.model'
import { HikooResponse } from '../../share/models/hikoo.model';
import { DataTypeRole, PermitView } from '../../share/models/permit.model';
import { start } from 'repl';

@ApiTags('alert')
@Controller('alert')
export class AlertsController {
    constructor(private alertSvc: AlertsService, private _logger: Logger) {
        _logger.setContext(AlertsController.name);
    }

    @Get()
    @ApiOperation({ summary: 'Get alert list' })
    @ApiQuery({ name: 'startIndex', type: 'number', required: false })
    @ApiQuery({ name: 'count', type: 'number', required: false })
    @ApiResponse({ status: 200, type: Alerts, isArray: true, description: 'Return list of alert' })
    getAllAlert(
      @Query('startIndex') startIndex: number,
      @Query('count') count: number): Alerts[] {
        this._logger.debug(`get alert list, startIndex = [${startIndex}], count = [${count}]`)
        return this.alertSvc.getFakeAlerts();
    }

    @Get('count')
    @ApiOperation({ summary: 'Get alert count' })
    @ApiResponse({ status: 200, type: Number, description: 'Return count of alert' })
    allAlertCount(): number {
        this._logger.debug(`get alert count`)
        return this.alertSvc.getFakeAllAlertCount()
    }

    @Post()
    @ApiOperation({ summary: 'Create new Alert' })
    @ApiResponse({ status: 200, type: HikooResponse })
    createAlert(@Body() alert: CreateAlert): HikooResponse {
        this._logger.debug(alert);
        return { success: true };
    }
}
