import { Logger, Module } from '@nestjs/common';
import { TrailsController } from './trails.controller';
import { TrailsService } from './trails.service';

@Module({
  providers: [Logger, TrailsService],
  controllers: [TrailsController]
})
export class TrailsModule {}
