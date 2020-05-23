import { Module, Logger } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsGateway } from './events.gateway';


@Module({
  providers: [Logger, EventsService, EventsGateway ],
  controllers: [EventsController]
})
export class EventsModule {}
