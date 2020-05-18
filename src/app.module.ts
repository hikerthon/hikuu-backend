import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';

@Module({
  imports: [EventsModule],
  controllers: [AppController],
  providers: [Logger, AppService],
})
export class AppModule {}
