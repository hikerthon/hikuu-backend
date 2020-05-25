import { Logger, Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HikeEntity } from '../../share/entity/hike.entity';
import { EventEntity } from '../../share/entity/event.entity';
import { CheckinEntity } from '../../share/entity/checkin.entity';
import { AlertEntity } from '../../share/entity/alert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HikeEntity, EventEntity, CheckinEntity, AlertEntity])],
  controllers: [DashboardController],
  providers: [DashboardService, Logger]
})
export class DashboardModule {}
