import {
  Controller,
  Request,
  Post,
  Body,
  Logger,
  HttpStatus,
  HttpCode,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HikooResponse } from '../../share/dto/generic.dto';
import { SosService } from './sos.service';
import { EventDto } from '../../share/dto/event.dto';
import { LocationDto } from '../../share/dto/location.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('sos')
@Controller('sos')
export class SosController {
  constructor(private srv: SosService, private _logger: Logger) {
    _logger.setContext(SosController.name);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Call for SOS (event) to be pushed to stations' })
  @ApiResponse({ status: HttpStatus.OK, type: HikooResponse, description: 'successful operation' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: HikooResponse, description: 'Error: Unauthorized' })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    type: HikooResponse,
    description: 'Fail to call SOS (event) to be pushed to stations',
  })
  async callSOS(
    @Request() req,
    @Body() location: LocationDto,
  ): Promise<HikooResponse> {
    this._logger.debug(`@Post callSOS [${location}]`);
    const sos = new EventDto;
    sos.eventTypeId = 4;
    sos.alertLevelId = 4;
    sos.reporterId = req.user.userId;
    sos.latpt = location.latpt;
    sos.lngpt = location.lngpt;
    sos.radius = 10;
    sos.stat = 'PROCESSING';
    sos.eventInfo = 'HELP';
    sos.eventTime = new Date().getTime();

    const result = await this.srv.create(sos);
    if (!result.success) {
      throw new HttpException(
        { success: false, errorMessage: result.errorMessage },
        HttpStatus.FORBIDDEN,
      );
    }
    return result;
  }
}
