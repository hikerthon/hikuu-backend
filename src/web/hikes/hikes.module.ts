import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HikesService } from './hikes.service';
import { HikesController } from './hikes.controller';
import { HikeEntity } from '../../share/entity/hike.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HikeEntity])],
  providers: [Logger, HikesService],
  controllers: [HikesController]
})
export class HikesModule {}
