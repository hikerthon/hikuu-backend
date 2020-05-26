import { ApiResponse, ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Logger, Query, Param } from '@nestjs/common';
import { AlertService } from './alert.service';
import { HikooResponse, CountResponseDto } from '../../share/dto/generic.dto';
import { AlertDto, AlertViewDto } from 'src/share/dto/alert.dto';
import { FirebaseMessagingService } from '@aginix/nestjs-firebase-admin';

@ApiTags('alert')
@Controller('alert')
export class AlertController {
    constructor(
        private alertSvc: AlertService,
        private _logger: Logger,
        private _fcm: FirebaseMessagingService
    ) {
        _logger.setContext(AlertController.name);
    }

    @Get()
    @ApiOperation({ summary: 'Get all alerts' })
    @ApiQuery({ name: 'startIndex', type: 'number', required: true })
    @ApiQuery({ name: 'count', type: 'number', required: true })
    @ApiResponse({ status: 200, type: AlertViewDto, isArray: true, description: 'Return list of alert' })
    async getAllAlert(
        @Query('startIndex') startIndex: number,
        @Query('count') count: number): Promise<AlertViewDto[]> {
        this._logger.debug(`@Get, startIndex = [${startIndex}], count = [${count}]`)
        startIndex = (startIndex !== null ? startIndex : 0);
        count = (count !== null ? count : 10);
        return this.alertSvc.getAllView(startIndex, count);
    }

    @Get('count')
    @ApiOperation({ summary: 'Get alert count' })
    @ApiResponse({ status: 200, type: CountResponseDto, description: 'Return count of alert' })
    async allAlertCount(): Promise<CountResponseDto> {
        this._logger.debug(`@Get count`)
        return this.alertSvc.getCount();
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: 'number' })
    @ApiOperation({ summary: 'Get alert detail' })
    @ApiResponse({ status: 200, type: AlertViewDto, isArray: true, description: 'Return detail of alert' })
    async getAlertById(
        @Param('id') id: number): Promise<AlertViewDto> {
        this._logger.debug(`@Get, id = [${id}]`)
        return this.alertSvc.getViewById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create new Alert' })
    @ApiResponse({ status: 200, type: HikooResponse })
    async createAlert(@Body() alert: AlertDto): Promise<HikooResponse> {
        this._logger.debug(`@Post, info: ${alert.eventInfo}`);
        return await this.alertSvc.create(alert);
    }
}
