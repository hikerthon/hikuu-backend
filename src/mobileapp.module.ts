import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import { AlertModule } from './mobile/alert/alert.module';
import { EventModule } from './mobile/event/event.module';
import { LocationModule } from './mobile/location/location.module';
import { SosModule } from './mobile/sos/sos.module';
import { UserModule } from './mobile/user/user.module';
import { ShelterModule } from './mobile/shelter/shelter.module';
import { PermitModule } from './mobile/permit/permit.module';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as admin from 'firebase-admin';
// import { ConnectionOptionsReader } from 'typeorm';

const ormConfig = JSON.parse(readFileSync(join(__dirname, '../ormconfig.json')).toString()).mobile;

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
    TypeOrmModule.forRoot(ormConfig),
    AlertModule,
    EventModule,
    LocationModule,
    SosModule,
    UserModule,
    ShelterModule,
    PermitModule
  ],
  controllers: [],
  providers: [Logger],
})
export class MobileappModule { }