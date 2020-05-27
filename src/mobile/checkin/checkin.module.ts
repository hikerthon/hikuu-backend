import { Module, Logger } from '@nestjs/common';
import { CheckInController } from './checkin.controller';
import { CheckInService } from './checkin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckinEntity } from 'src/share/entity/checkin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CheckinEntity], 'mobile'),
  ],
  controllers: [CheckInController],
  providers: [CheckInService, Logger]
})

export class CheckInModule { }