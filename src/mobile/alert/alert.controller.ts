import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AlertService } from './alert.service'
import { AlertViewDto } from 'src/share/dto/alert.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('alert')
@Controller('alert')
export class AlertController {
  constructor(private srv: AlertService, private _logger: Logger) {
    _logger.setContext(AlertController.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all alerts' })
  @ApiResponse({ status: 200, type: AlertViewDto, isArray: true, description: 'successful operation' })
  async getAlerts(): Promise<AlertViewDto[]> {
    this._logger.debug(`@Get all`)
    return this.srv.getAllView();
  }
}