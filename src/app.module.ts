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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EventsGateway } from './events/events.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static/socketio'),
    }),
    EventsModule,
    ExampleModule,
    PermitModule
  ],
  controllers: [
    AppController,
    AllgpsController,
    EventtypeController,
    AlertlevelController,
    AlertsController,
    TrailsController
  ],
  providers: [
    Logger,
    AppService,
    AllgpsService,
    EventtypeService,
    AlertlevelService,
    AlertsService,
    TrailsService,
    EventsGateway]
  ,
})
export class AppModule { }
