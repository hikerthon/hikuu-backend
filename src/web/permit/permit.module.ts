import { Module, Logger } from '@nestjs/common';
import { PermitController } from './permit.controller';
import { PermitService } from './permit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermitEntity } from '../../share/entity/permit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermitEntity])],
  controllers: [PermitController],
  providers: [Logger, PermitService]
})
export class PermitModule {}
