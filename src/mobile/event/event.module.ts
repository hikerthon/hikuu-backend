import { Module, Logger } from '@nestjs/common';
import { EventController } from './event.controller'
import { EventService } from './event.service';
import { EventsGateway } from 'src/events/events.gateway';


@Module({
  controllers: [EventController],
  providers: [Logger, EventsGateway, EventService]
})

export class EventModule { }
