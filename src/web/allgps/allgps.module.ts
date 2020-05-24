import { Module, Logger } from '@nestjs/common';
import { AllgpsController } from './allgps.controller';
import { AllgpsService } from './allgps.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapGpsEntity } from 'src/share/entity/allgps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MapGpsEntity])],
  providers: [Logger, AllgpsService],
  controllers: [AllgpsController]
})
export class AllgpsModule {

}
