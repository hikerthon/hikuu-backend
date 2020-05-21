import { Controller, Logger, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { PermitView } from '../models/permit.model';
import { PermitService } from './permit.service';

@Controller('permit')
export class PermitController {

  constructor(private permitSvc: PermitService, private _logger: Logger) {
    _logger.setContext(PermitController.name);
  }

  @Get()
  @ApiResponse({ status: 200, type: PermitView, isArray: true, description: 'Get permit list' })
  getPermit() {
    return this.permitSvc.getFakePermits()
  }
}
