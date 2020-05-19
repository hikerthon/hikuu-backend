import { ApiResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { AlertlevelService } from "./alertlevel.service";

export class AlertLevel {
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    ttl: number;
    
    @ApiProperty()
    radius: number;
}

@ApiTags('basic')
@Controller('alertlevel')
export class AlertlevelController {
    constructor(private alSvc: AlertlevelService) {}

    @Get()
    @ApiResponse({ status: 200, type: AlertLevel, isArray: true, description: 'Returns all alert level' })
    getAlertLevels() {
        return this.alSvc.getAlertLevels();
    }
}
