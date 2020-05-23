import { Module, Logger } from '@nestjs/common';
import { AllgpsController } from './allgps.controller';
import { AllgpsService } from './allgps.service';

@Module({
  providers: [Logger, AllgpsService],
  controllers: [AllgpsController]
})
export class AllgpsModule {

}
