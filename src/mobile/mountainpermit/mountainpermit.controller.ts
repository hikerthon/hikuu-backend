import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { MountainPermit } from './mountainpermit';
import { MountainpermitService } from './mountainpermit.service';

@ApiTags('mountain permit')
@Controller('mountainpermit')
export class MountainpermitController {
  constructor(private srv: MountainpermitService) { }

  @Get()
  @ApiResponse({ status: 200, type: MountainPermit, isArray: false, description: 'Return user location' })
  getMountainPermits() {
    return this.srv.getMountainPermits();
  }
}
