import { Module, Logger } from '@nestjs/common';
import { ShelterService } from '../shelter/shelter.service';
import { ShelterController } from '../shelter/shelter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShelterEntity } from 'src/share/entity/shelter.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ShelterEntity])],
    providers: [Logger, ShelterService],
    controllers: [ShelterController]
})
export class ShelterModule {}
