import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { ExampleModule } from './example/example.module';
import { PermitModule } from './permit/permit.module';

@Module({
  imports: [EventsModule, ExampleModule, PermitModule],
  controllers: [AppController],
  providers: [Logger, AppService],
})
export class AppModule {}
