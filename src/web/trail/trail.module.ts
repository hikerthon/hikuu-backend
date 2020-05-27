import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrailController } from './trail.controller';
import { TrailService } from './trail.service';
import { TrailEntity } from '../../share/entity/trail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrailEntity])],
  controllers: [TrailController],
  providers: [Logger, TrailService],
})
export class TrailModule {
}
