import { Module, Logger } from '@nestjs/common';
import { PermitController } from './permit.controller';
import { PermitService } from './permit.service';

@Module({
  controllers: [PermitController],
  providers: [Logger, PermitService]
})
export class PermitModule {}
