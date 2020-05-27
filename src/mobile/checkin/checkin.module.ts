import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckInController } from './checkin.controller';
import { CheckOutController } from './checkout.controller';
import { CheckInService } from './checkin.service';
import { CheckinEntity } from '../../share/entity/checkin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CheckinEntity], 'mobile'),
  ],
  controllers: [CheckInController, CheckOutController],
  providers: [CheckInService, Logger],
})

export class CheckInModule {
}