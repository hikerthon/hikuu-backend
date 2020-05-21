import { Module, Logger } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { EventsGateway } from 'src/events/events.gateway';

@Module({
  controllers: [ExampleController],
  providers: [Logger, EventsGateway]
})
export class ExampleModule {
}
