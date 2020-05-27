import { Logger, Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { HikeEntity } from '../../share/entity/hike.entity';
import { EventEntity } from '../../share/entity/event.entity';
import { CheckinEntity } from '../../share/entity/checkin.entity';
import { AlertEntity } from '../../share/entity/alert.entity';
import { EventsGateway } from '../events/events.gateway';
import { AllGpsEntity } from '../../share/entity/allgps.entity'

@Module({
  imports: [TypeOrmModule.forFeature([HikeEntity, EventEntity, CheckinEntity, AlertEntity, AllGpsEntity]),
    ScheduleModule.forRoot()],
  controllers: [DashboardController],
  providers: [DashboardService, Logger, EventsGateway]
})
export class DashboardModule {}
