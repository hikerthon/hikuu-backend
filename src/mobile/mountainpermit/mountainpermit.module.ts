import { Module } from '@nestjs/common';
import { MountainpermitController } from './mountainpermit.controller';
import { MountainpermitService } from './mountainpermit.service';

@Module({
  controllers: [MountainpermitController],
  providers: [MountainpermitService]
})

export class MountainpermitModule { }


