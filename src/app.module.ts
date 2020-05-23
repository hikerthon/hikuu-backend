import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './web/events/events.module';
import { ExampleModule } from './example/example.module';
import { AllgpsService } from './web/allgps/allgps.service';
import { AllgpsController } from './web/allgps/allgps.controller';
import { EventtypeModule } from './web/eventtype/eventtype.module';
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
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';

@Module({
  imports: [
    FirebaseAdminModule.forRootAsync({
      useFactory: () => {

        const hikooService = JSON.parse(
          readFileSync(join(__dirname, '../fcm/hikoo.json')).toString()
        );

        return {
          credential: admin.credential.cert(hikooService),
          databaseURL: 'https://bamboo-creek-277702.firebaseio.com'
        };
      }
    }),
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static/socketio'),
    }),
    EventsModule,
    EventtypeModule,
    ExampleModule,
    PermitModule
  ],
  controllers: [
    AppController,
    AllgpsController,
    AlertlevelController,
    AlertsController,
    TrailsController
  ],
  providers: [
    Logger,
    AppService,
    AllgpsService,
    AlertlevelService,
    AlertsService,
    TrailsService,
    EventsGateway]
  ,
})
export class AppModule { }
