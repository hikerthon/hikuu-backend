import { ApiResponse, ApiBody, ApiProperty, ApiParam } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { AllgpsService } from "./allgps.service";

export class AllGps {
    @ApiProperty()
    location: string;
  
    @ApiProperty({ enum: ['Hiker','Event','Alert']})
    point_type: string;
  
    @ApiProperty()
    event_id: number;
    
    @ApiProperty()
    alert_id: number;

    @ApiProperty()
    timestamp: number;
}

@Controller('allgps')
export class AllgpsController {
    constructor(private allgpsService: AllgpsService) {}

    @Get()
    @ApiResponse({ status: 200, type: AllGps, isArray: true, description: 'Returns list of hiker, events, and alert to be shown on web dashboard map.' })
    getAllGPS() {
        return this.allgpsService.getAllGPS();
    }
}
