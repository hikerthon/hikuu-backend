import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './web/events/events.module';
import { AlertlevelModule } from './web/alertlevel/alertlevel.module'
import { AlertModule } from './web/alert/alert.module';
import { AllgpsModule } from './web/allgps/allgps.module';
import { EventtypeModule } from './web/eventtype/eventtype.module';
import { PermitModule } from './web/permit/permit.module';
import { TrailModule } from './web/trail/trail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { ShelterModule } from './web/shelter/shelter.module';
import { StationModule } from './web/station/station.module';
import { AccountModule } from './web/account/account.module';

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
    PermitModule,
    AlertlevelModule,
    AlertModule,
    AllgpsModule,
    TrailModule,
    ShelterModule,
    StationModule,
    AccountModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    Logger,
    AppService
  ]
  ,
})
export class AppModule { }
