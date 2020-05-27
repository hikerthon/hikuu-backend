import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationController } from './station.controller';
import { StationService } from './station.service';
import { StationEntity } from '../../share/entity/station.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StationEntity])],
  controllers: [StationController],
  providers: [Logger, StationService],
})
export class StationModule {
}
