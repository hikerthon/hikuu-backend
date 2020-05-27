import { Module, Logger } from '@nestjs/common';
import { AlertController } from './alert.controller';
import { AlertService } from './alert.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertEntity } from 'src/share/entity/alert.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlertEntity])],
  providers: [Logger, AlertService],
  controllers: [AlertController],
})
export class AlertModule {
}