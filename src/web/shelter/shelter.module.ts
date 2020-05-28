import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShelterService } from './shelter.service';
import { ShelterController } from './shelter.controller';
import { ShelterEntity } from '../../share/entity/shelter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShelterEntity])],
  providers: [Logger, ShelterService],
  controllers: [ShelterController],
})
export class ShelterModule {
}
