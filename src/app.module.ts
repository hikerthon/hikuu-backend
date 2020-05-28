import { Module, Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as admin from 'firebase-admin';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from 'nestjs-s3';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Web Module
import { EventsModule } from './web/events/events.module';
import { AlertlevelModule } from './web/alertlevel/alertlevel.module';
import { AlertModule } from './web/alert/alert.module';
import { AllgpsModule } from './web/allgps/allgps.module';
import { EventtypeModule } from './web/eventtype/eventtype.module';
import { PermitModule } from './web/permit/permit.module';
import { TrailModule } from './web/trail/trail.module';
import { ShelterModule } from './web/shelter/shelter.module';
import { StationModule } from './web/station/station.module';
import { AccountModule } from './web/account/account.module';
import { HikesModule } from './web/hikes/hikes.module';
import { CheckinModule } from './web/checkin/checkin.module';
import { DashboardModule } from './web/dashboard/dashboard.module';
import { StatisticModule } from './web/statistic/statistic.module';


// eslint-disable-next-line @typescript-eslint/no-var-requires
const ormConfig = JSON.parse(readFileSync(join(__dirname, '../ormconfig.json')).toString()).default;

@Module({
  imports: [
    FirebaseAdminModule.forRootAsync({
      useFactory: () => {

        const hikooService = JSON.parse(
          readFileSync(join(__dirname, '../fcm/hikoo.json')).toString(),
        );

        return {
          credential: admin.credential.cert(hikooService),
          databaseURL: 'https://bamboo-creek-277702.firebaseio.com',
        };
      },
    }),
    TypeOrmModule.forRoot(ormConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static/socketio'),
    }),
    S3Module.forRoot({
      config: {
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
      },
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
    AccountModule,
    HikesModule,
    CheckinModule,
    DashboardModule,
    StatisticModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    Logger,
    AppService,
  ]
  ,
})
export class AppModule {
}
