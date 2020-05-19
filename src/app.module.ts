import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [EventsModule, ExampleModule],
  controllers: [AppController],
  providers: [Logger, AppService],
})
export class AppModule {}
