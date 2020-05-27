import { Module, Logger } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackerEntity } from 'src/share/entity/tracker.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackerEntity], 'mobile'),
  ],
  controllers: [LocationController],
  providers: [LocationService, Logger]
})

export class LocationModule { }