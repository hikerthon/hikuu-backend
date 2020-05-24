import { Logger, Module } from '@nestjs/common';
import { AlertlevelService } from './alertlevel.service';
import { AlertlevelController } from './alertlevel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertlevelEntity } from '../../share/entity/alertlevel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlertlevelEntity])],
  providers: [Logger, AlertlevelService],
  controllers: [AlertlevelController]
})
export class AlertlevelModule {}
