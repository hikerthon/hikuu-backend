import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './web/events/events.module';
import { ExampleModule } from './example/example.module';
import { AllgpsService } from './web/allgps/allgps.service';
import { AllgpsController } from './web/allgps/allgps.controller';
import { EventtypeService } from './web/eventtype/eventtype.service';
import { EventtypeController } from './web/eventtype/eventtype.controller';
import { AlertlevelService } from './web/alertlevel/alertlevel.service';
import { AlertlevelController } from './web/alertlevel/alertlevel.controller';
import { AlertsService } from './web/alerts/alerts.service';
import { AlertsController } from './web/alerts/alerts.controller';
import { PermitModule } from './web/permit/permit.module';
import { TrailsController } from './web/trails/trails.controller';
import { TrailsService } from './web/trails/trails.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { EventsGateway } from './web/events/events.gateway';

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
