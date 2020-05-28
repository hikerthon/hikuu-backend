import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventService } from './events.service';
import { EventsController } from './events.controller';
import { EventsGateway } from './events.gateway';
import { EventEntity } from '../../share/entity/event.entity';


@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  providers: [Logger, EventService, EventsGateway],
  controllers: [EventsController],
})
export class EventsModule {
}
