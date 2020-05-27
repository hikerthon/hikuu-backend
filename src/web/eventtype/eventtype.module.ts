import { Module } from '@nestjs/common';
import { EventtypeController } from './eventtype.controller';
import { EventtypeService } from './eventtype.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventtypeEntity } from '../../share/entity/eventtype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventtypeEntity])],
  controllers: [EventtypeController],
  providers: [EventtypeService],
})

export class EventtypeModule {
}