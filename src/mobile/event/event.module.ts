import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './event.controller'
import { EventService } from './event.service';
import { EventsGateway } from 'src/web/events/events.gateway';
import { EventEntity } from 'src/share/entity/event.entity';


@Module({
  imports: [TypeOrmModule.forFeature([EventEntity], 'mobile')],
  controllers: [EventController],
  providers: [Logger, EventsGateway, EventService]
})

export class EventModule { }
