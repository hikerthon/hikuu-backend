import { Module, Logger } from '@nestjs/common';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [StatisticController],
  providers: [Logger, StatisticService]
})
export class StatisticModule {}
