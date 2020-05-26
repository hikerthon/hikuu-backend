import { Module, Logger } from '@nestjs/common';
import { AroundMeService } from './aroundme.service';
import { AroundMeController } from './aroundme.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([], 'mobile')],
  providers: [Logger, AroundMeService],
  controllers: [AroundMeController],
})
export class AroundMeModule { }
