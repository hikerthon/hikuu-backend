import { Controller, Get, Logger, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AlertService } from './alert.service'
import { AlertViewDto } from 'src/share/dto/alert.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HikooResponse } from 'src/share/dto/generic.dto';

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
  @ApiResponse({ status: HttpStatus.OK, type: AlertViewDto, isArray: true, description: 'successful operation' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: HikooResponse, description: 'Error: Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: HikooResponse, description: 'Fail to get all alerts', })
  async getAlerts(): Promise<AlertViewDto[]> {
    try {
      this._logger.debug(`@Get all`)
      return await this.srv.getAllView();
    } catch (e) {
      throw new HttpException(
        { success: false, errorMessage: e.message },
        HttpStatus.FORBIDDEN
      );
    }
  }
}