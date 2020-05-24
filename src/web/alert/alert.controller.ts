import { ApiResponse, ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Logger, Query, Param } from '@nestjs/common';
import { AlertService } from './alert.service';
import { HikooResponse } from '../../share/models/hikoo.model';
import { AlertDto, AlertViewDto } from 'src/share/dto/alert.dto';

@ApiTags('alert')
@Controller('alert')
export class AlertController {
    constructor(private alertSvc: AlertService, private _logger: Logger) {
        _logger.setContext(AlertController.name);
    }

    @Get()
    @ApiOperation({ summary: 'Get alert list' })
    @ApiQuery({ name: 'startIndex', type: 'number', required: false })
    @ApiQuery({ name: 'count', type: 'number', required: false })
    @ApiResponse({ status: 200, type: AlertViewDto, isArray: true, description: 'Return list of alert' })
    async getAllAlert(
      @Query('startIndex') startIndex: number,
      @Query('count') count: number): Promise<AlertViewDto[]> {
        this._logger.debug(`@Get, startIndex = ${startIndex}, count = ${count}`)
        return this.alertSvc.getAllView(startIndex, count);
    }

    @Get('count')
    @ApiOperation({ summary: 'Get alert count' })
    @ApiResponse({ status: 200, type: Number, description: 'Return count of alert' })
    async allAlertCount(): Promise<number> {
        this._logger.debug(`@Get count`)
        return this.alertSvc.getCount();
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: 'number' })
    @ApiOperation({ summary: 'Get alert detail' })
    @ApiResponse({ status: 200, type: AlertViewDto, isArray: true, description: 'Return detail of alert' })
    async getAlertById(
      @Param('id') id: number): Promise<AlertViewDto> {
        this._logger.debug(`@Get, id = ${id}`)
        return this.alertSvc.getViewById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create new Alert' })
    @ApiResponse({ status: 200, type: HikooResponse })
    async createAlert(@Body() alert: AlertDto): Promise<HikooResponse> {
        this._logger.debug(`@Post, ${alert}`);
        return await this.alertSvc.create(alert);
    }
}
