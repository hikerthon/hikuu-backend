import { Module, Logger } from '@nestjs/common';
import { SosService } from './sos.service';
import { SosController } from './sos.controller';

@Module({
  controllers: [SosController],
  providers: [Logger, SosService],
})
export class SosModule { }
