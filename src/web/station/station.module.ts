import { Logger, Module } from '@nestjs/common';
import { StationController } from './station.controller';
import { StationService } from './station.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationEntity } from 'src/share/entity/station.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StationEntity])],
  controllers: [StationController],
  providers: [Logger, StationService]
})
export class StationModule {}
