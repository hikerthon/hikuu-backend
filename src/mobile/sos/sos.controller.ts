import { Controller, Post, Body, Logger } from '@nestjs/common';
import { Location } from '../../share/models/location.model';
import { ApiResponse, ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { HikooResponse } from '../../share/models/hikoo.model';
import { SosService } from './sos.service';
import { EventDto } from 'src/share/dto/event.dto';


@ApiTags("sos")
@Controller('sos')
export class SosController {
  constructor(private srv: SosService, private _logger: Logger) {
    _logger.setContext(SosController.name);
  }

  @Post()
  @ApiOperation({ summary: 'Call for SOS (event) to be pushed to stations' })
  @ApiBody({ type: Location })
  @ApiResponse({ status: 200, type: HikooResponse, description: 'successful operation' })
  async callSOS(@Body() location: Location): Promise<HikooResponse> {
    this._logger.debug(`@Post callSOS [${location}]`);
    let sos = new EventDto;
    sos.eventTypeId = 4;
    sos.alertLevelId = 4;
    sos.reporterId = location.userId;
    sos.latpt = location.lat;
    sos.lngpt = location.lng;
    sos.radius = 10;
    sos.stat = 'PROCESSING';
    sos.eventInfo = 'HELP';
    sos.eventTime = new Date();

    return await this.srv.create(sos)
  }
}
