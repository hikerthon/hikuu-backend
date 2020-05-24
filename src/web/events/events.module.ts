import { Module, Logger } from '@nestjs/common';
import { EventService } from './events.service';
import { EventsController } from './events.controller';
import { EventsGateway } from './events.gateway';
import { EventEntity } from 'src/share/entity/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  providers: [Logger, EventService, EventsGateway ],
  controllers: [EventsController]
})
export class EventsModule {}
