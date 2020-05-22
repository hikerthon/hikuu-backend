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
import { AlertsService } from './alerts/alerts.service';
import { AlertsController } from './alerts/alerts.controller';
import { PermitModule } from './permit/permit.module';
import { TrailsController } from './trails/trails.controller';
import { TrailsService } from './trails/trails.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventtypeModule } from './eventtype/eventtype.module';

@Module({
  imports: [TypeOrmModule.forRoot(), EventsModule, ExampleModule, PermitModule, EventtypeModule],
  controllers: [AppController, AllgpsController, AlertlevelController, AlertsController, TrailsController],
  providers: [Logger, AppService, AllgpsService, AlertlevelService, AlertsService, TrailsService],
})
export class AppModule {}
