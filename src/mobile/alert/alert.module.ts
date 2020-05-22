import { Module, Logger } from '@nestjs/common';
import { AlertController } from './alert.controller';
import { AlertService } from './alert.service';

@Module({
  controllers: [AlertController],
  providers: [AlertService, Logger],
})

export class AlertModule { }