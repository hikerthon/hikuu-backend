import { Controller, Logger, Get } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

export class Permit {
  @ApiProperty()
  id: number;

  @ApiProperty()
  permitName: string;
}

@Controller('permit')
export class PermitController {

  constructor(private _logger: Logger) {
    _logger.setContext(PermitController.name);
  }

  @Get()
  @ApiResponse({ status: 200, type: Permit, isArray: true, description: 'Get permits.' })
  getPermit() {
    return { id: 0, permitName: 'stub permit'};
  }
}
