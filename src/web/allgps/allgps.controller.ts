import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { AllgpsService } from './allgps.service';
import { AllGPSDto } from 'src/share/dto/allgps.dto';

@ApiTags('allgps')
@Controller('allgps')
export class AllgpsController {
  constructor(private allgpsService: AllgpsService) {
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: AllGPSDto,
    isArray: true,
    description: 'Returns list of hiker, events, and alert to be shown on web dashboard map.',
  })
  async getAllGPS(): Promise<AllGPSDto[]> {
    return this.allgpsService.getAll();
  }
}
