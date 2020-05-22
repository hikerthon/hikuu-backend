import { Controller, Logger, Param, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PermitView } from '../../events/share/models/permit.model'
import { PermitService } from './permit.service';

@ApiTags('permit')
@Controller('permit')
export class PermitController {
  constructor(private srv: PermitService, private _logger: Logger) {
    _logger.setContext(PermitController.name);
  }

  // @Get(':userId')
  // @ApiOperation({ summary: 'Get permits by hiker id.' })
  // @ApiParam({ name: 'userId', type: 'string' })
  // @ApiResponse({ status: 200, type: PermitView, isArray: true, description: 'Get permits by hiker id successfully' })
  // getPermits(@Param('userId') userId: string): PermitView[] {
  //   this._logger.debug(userId);
  //   // return this.srv.getPermits(userId);
  // }


}
