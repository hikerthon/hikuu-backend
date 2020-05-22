import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './web/events/events.module';
import { ExampleModule } from './example/example.module';
import { AlertlevelModule } from './web/alertlevel/alertlevel.module'
import { AlertsModule } from './web/alerts/alerts.module';
import { AllgpsModule } from './web/allgps/allgps.module';
import { EventtypeModule } from './web/eventtype/eventtype.module';
import { PermitModule } from './web/permit/permit.module';
import { TrailsModule } from './web/trails/trails.module';
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
    EventtypeModule,
    ExampleModule,
    PermitModule,
    AlertlevelModule,
    AlertsModule,
    AllgpsModule,
    TrailsModule
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
