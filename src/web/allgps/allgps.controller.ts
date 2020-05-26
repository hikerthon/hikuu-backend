import { ApiResponse, ApiBody, ApiProperty, ApiParam, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { AllgpsService } from "./allgps.service";
import { AllGpsEntity } from 'src/share/entity/allgps.entity';

@ApiTags('allgps')
@Controller('allgps')
export class AllgpsController {
    constructor(private allgpsService: AllgpsService) {}

    @Get()
    @ApiResponse({ status: 200, type: AllGpsEntity, isArray: true, description: 'Returns list of hiker, events, and alert to be shown on web dashboard map.' })
    async getAllGPS(): Promise<AllGpsEntity[]> {
        return this.allgpsService.getAll();
    }
}
