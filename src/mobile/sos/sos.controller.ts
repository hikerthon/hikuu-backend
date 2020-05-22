import { Controller, Post, Body, Logger } from '@nestjs/common';
import { SOS } from '../../share/models/sos.model';
import { ApiResponse, ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { HikooResponse } from '../../share/models/hikoo.model';
import { SosService } from './sos.service';


@ApiTags("sos")
@Controller('sos')
export class SosController {
  constructor(private srv: SosService, private _logger: Logger) {
    _logger.setContext(SosController.name);
  }

  @Post()
  @ApiOperation({ summary: 'call SOS to police station.' })
  @ApiBody({ type: SOS })
  @ApiResponse({ status: 200, type: HikooResponse, description: 'Call SOS to police station successfully' })
  callSOS(@Body() sos: SOS): HikooResponse {
    this._logger.debug(sos);

    if (this.srv.callSOS(sos)) {
      return { success: true };
    } else {
      return { success: false, errorMessage: 'Fail to call SOS to police station' }
    }

  }

}
