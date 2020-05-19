import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { ExampleModule } from './example/example.module';
import { AllgpsService } from './allgps/allgps.service';
import { AllgpsController } from './allgps/allgps.controller';
import { EventtypeService } from './eventtype/eventtype.service';
import { EventtypeController } from './eventtype/eventtype.controller';
import { AlertlevelService } from './alertlevel/alertlevel.service';
import { AlertlevelController } from './alertlevel/alertlevel.controller';

@Module({
  imports: [EventsModule, ExampleModule],
  controllers: [AppController, AllgpsController, EventtypeController, AlertlevelController],
  providers: [Logger, AppService, AllgpsService, EventtypeService, AlertlevelService],
})
export class AppModule {}
