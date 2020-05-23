import { Logger, Module } from '@nestjs/common';
import { TrailController } from './trail.controller';
import { TrailService } from './trail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrailEntity } from 'src/share/entity/trail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrailEntity])],
  controllers: [TrailController],
  providers: [Logger, TrailService]
})
export class TrailModule {}
