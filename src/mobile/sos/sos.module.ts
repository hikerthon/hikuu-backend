import { Module, Logger } from '@nestjs/common';
import { SosService } from './sos.service';
import { SosController } from './sos.controller';
import { EventEntity } from 'src/share/entity/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity], 'mobile')],
  providers: [Logger, SosService],
  controllers: [SosController],
})
export class SosModule { }
