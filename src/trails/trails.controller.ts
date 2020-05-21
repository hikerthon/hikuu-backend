import { Controller, Logger, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { TrailView } from '../models/permit.model';
import { TrailsService } from './trails.service';

@Controller('trails')
export class TrailsController {

    constructor(private trailsSvc: TrailsService, private _logger: Logger) {
      _logger.setContext(TrailsController.name);
    }

    @Get()
    @ApiResponse({ status: 200, type: TrailView, isArray: true, description: 'Get Trails list' })
    getPermit() {
      return this.trailsSvc.getFakeTrails()
    }
}
