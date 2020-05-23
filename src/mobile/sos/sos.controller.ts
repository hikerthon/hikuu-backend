import { Controller, Post, Body, Logger } from '@nestjs/common';
import { Location } from '../../share/models/location.model';
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
  @ApiOperation({ summary: 'Call SOS to police station' })
  @ApiBody({ type: Location })
  @ApiResponse({ status: 200, type: HikooResponse, description: 'successful operation' })
  callSOS(@Body() location: Location): HikooResponse {
    this._logger.debug(location);

    if (this.srv.callSOS(location)) {
      return { success: true };
    } else {
      return { success: false, errorMessage: 'Fail to call SOS to police station' }
    }

  }

}
