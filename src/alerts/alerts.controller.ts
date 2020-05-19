import { ApiResponse, ApiPropertyOptional, ApiProperty, ApiParam, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { AlertsService } from "./alerts.service";

export class Alerts {
    @ApiProperty()
    permit_id: number;
  
    @ApiProperty()
    permit_name: string;
  
    @ApiProperty()
    location: string;
    
    @ApiProperty()
    radius: number;

    @ApiProperty()
    alert_id: number;

    @ApiProperty()
    alert_level: string;

    @ApiPropertyOptional()
    event_id: number;

    @ApiProperty()
    event_type: string;

    @ApiProperty()
    event_info: string;

    @ApiProperty()
    event_time: string;

    @ApiProperty()
    ttl: number;
    
    @ApiProperty()
    station_id: number;
  
    @ApiProperty()
    station_name: string;
}

@ApiTags('alerts')
@Controller('alerts')
export class AlertsController {
    constructor(private alertSvc: AlertsService) {}

    @Get()
    @ApiResponse({ status: 200, type: Alerts, isArray: true, description: 'Return list of alert' })
    getAllEvent() {
        return this.alertSvc.getAllAlerts();
    }}
