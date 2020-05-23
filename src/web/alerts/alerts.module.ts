import { Module, Logger } from '@nestjs/common';
import { AlertsController } from './alerts.controller';
import { AlertsService } from './alerts.service';

@Module({
  providers: [Logger, AlertsService],
  controllers: [AlertsController]
})
export class AlertsModule {}

