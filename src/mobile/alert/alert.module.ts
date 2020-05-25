import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertController } from './alert.controller';
import { AlertService } from './alert.service';
import { AlertEntity } from '../../share/entity/alert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlertEntity], 'mobile')],
  controllers: [AlertController],
  providers: [AlertService, Logger],
})

export class AlertModule { }