import { Module, Logger } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Module({
  providers: [Logger, EventsGateway],
})
export class EventsModule { }