import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AlertService } from './alert.service'
import { AlertDto } from 'src/share/dto/alert.dto';


@ApiTags('alert')
@Controller('alert')
export class AlertController {
  constructor(private srv: AlertService, private _logger: Logger) {
    _logger.setContext(AlertController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get all alerts.' })
  @ApiResponse({ status: 200, type: AlertDto, isArray: true, description: 'Get alerts successfully' })
  getAlerts(): AlertDto[] {
    return this.srv.getAlerts();
  }
}
