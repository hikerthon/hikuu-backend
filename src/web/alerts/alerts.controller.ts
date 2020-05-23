import { ApiResponse, ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Logger, Query, Param } from '@nestjs/common';
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

    @Get(':id')
    @ApiParam({ name: 'id', type: 'number' })
    @ApiOperation({ summary: 'Get alert detail' })
    @ApiResponse({ status: 200, type: Alerts, isArray: true, description: 'Return detail of alert' })
    getAlertById(
      @Param('id') id: number): Alerts[] {
        this._logger.debug(`get alert list, startIndex = [${id}]`)
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
