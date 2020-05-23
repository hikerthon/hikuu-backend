import { ApiResponse, ApiBody, ApiProperty, ApiParam, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { AllgpsService } from "./allgps.service";

export class AllGps {
    @ApiProperty()
    location: string;
  
    @ApiProperty({ enum: ['Hiker','Event','Alert']})
    pointType: string;
  
    @ApiProperty()
    eventId: number;
    
    @ApiProperty()
    alertId: number;

    @ApiProperty()
    timestamp: number;
}

@ApiTags('allgps')
@Controller('allgps')
export class AllgpsController {
    constructor(private allgpsService: AllgpsService) {}

    @Get()
    @ApiResponse({ status: 200, type: AllGps, isArray: true, description: 'Returns list of hiker, events, and alert to be shown on web dashboard map.' })
    getAllGPS() {
        return this.allgpsService.getAllGPS();
    }
}
