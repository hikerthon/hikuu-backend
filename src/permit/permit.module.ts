import { Module, Logger } from '@nestjs/common';
import { PermitController } from './permit.controller';

@Module({
  controllers: [PermitController],
  providers: [Logger]
})
export class PermitModule {}
