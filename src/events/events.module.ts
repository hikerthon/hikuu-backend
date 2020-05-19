import { Module, Logger } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  providers: [Logger, EventsGateway, EventsService],
  controllers: [EventsController]
})
export class EventsModule {}
