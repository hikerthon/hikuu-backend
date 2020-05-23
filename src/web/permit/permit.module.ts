import { Module, Logger } from '@nestjs/common';
import { PermitController } from './permit.controller';
import { PermitService } from './permit.service';
import { PermitEntity } from 'src/share/entity/permit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PermitEntity])],
  controllers: [PermitController],
  providers: [Logger, PermitService]
})
export class PermitModule {}
