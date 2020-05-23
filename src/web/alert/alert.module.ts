import { Module, Logger } from '@nestjs/common';
import { AlertController } from './alert.controller';
import { AlertService } from './alert.service';

@Module({
  providers: [Logger, AlertService],
  controllers: [AlertController]
})
export class AlertModule {}

