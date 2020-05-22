import { Module, Logger } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  providers: [Logger, EventsService],
  controllers: [EventsController]
})
export class EventsModule {}
