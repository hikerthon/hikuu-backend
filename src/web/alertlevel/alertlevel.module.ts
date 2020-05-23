import { Logger, Module } from '@nestjs/common';
import { AlertlevelService } from './alertlevel.service';
import { AlertlevelController } from './alertlevel.controller';

@Module({
  providers: [Logger, AlertlevelService],
  controllers: [AlertlevelController]
})
export class AlertlevelModule {}
