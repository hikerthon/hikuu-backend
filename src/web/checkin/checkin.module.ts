import { Logger, Module } from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { CheckinController } from './checkin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckinEntity } from '../../share/entity/checkin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckinEntity])],
  providers: [Logger, CheckinService],
  controllers: [CheckinController]
})
export class CheckinModule {}
