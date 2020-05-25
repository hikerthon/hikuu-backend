import { Module, Logger } from '@nestjs/common';
import { AlertModule } from './alert/alert.module';
import { EventModule } from './event/event.module';
import { LocationModule } from './location/location.module';
import { SosModule } from './sos/sos.module';
import { UserModule } from './user/user.module';
import { ShelterModule } from './shelter/shelter.module';
import { PermitController } from './permit/permit.controller';
import { PermitService } from './permit/permit.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), AlertModule, EventModule, LocationModule, SosModule, UserModule, ShelterModule],
  controllers: [PermitController],
  providers: [Logger, PermitService],
})
export class MobileappModule { }

// @Module({
//   imports: [EventsModule, ExampleModule, PermitModule],
//   controllers: [AppController, AllgpsController, EventtypeController, AlertlevelController, AlertsController],
//   providers: [Logger, AppService, AllgpsService, EventtypeService, AlertlevelService, AlertsService
//   ],
// })
// export class AppModule { }