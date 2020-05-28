import { Module, Logger } from '@nestjs/common';
import { ShelterController } from './shelter.controller';
import { ShelterService } from './shelter.service';

@Module({
  controllers: [ShelterController],
  providers: [Logger, ShelterService],
})

export class ShelterModule {
}