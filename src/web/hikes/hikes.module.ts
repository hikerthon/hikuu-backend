import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HikesService } from './hikes.service';
import { HikesController } from './hikes.controller';
import { HikeEntity } from '../../share/entity/hike.entity';
import { AccountEntity } from '../../share/entity/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HikeEntity, AccountEntity])],
  providers: [Logger, HikesService],
  controllers: [HikesController],
})
export class HikesModule {
}
