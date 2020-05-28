import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermitController } from './permit.controller';
import { PermitService } from './permit.service';
import { HikeEntity } from '../../share/entity/hike.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HikeEntity], 'mobile')],
  controllers: [PermitController],
  providers: [Logger, PermitService],
})

export class PermitModule {
}