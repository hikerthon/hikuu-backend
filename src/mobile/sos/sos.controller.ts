import { Controller, Post, Body } from '@nestjs/common';
import { SOS } from './sos'
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SosService } from './sos.service';

@ApiTags("sos")
@Controller('sos')
export class SosController {
  constructor(private srv: SosService) { };

  @Post()
  @ApiResponse({ status: 200, description: 'Call SOS to police station' })
  callSOS(@Body() sos: SOS) {
    this.srv.callSOS(sos);
  }

}
