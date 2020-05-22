import { Module } from '@nestjs/common';
import { EventtypeService } from './eventtype.service';
import { EventtypeController } from './eventtype.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventtypeEntity } from './entity/eventtype.entity';

@Module({
    imports: [TypeOrmModule.forFeature([EventtypeEntity])],
    controllers: [EventtypeController],
    providers: [EventtypeService]
})
export class EventtypeModule {}
