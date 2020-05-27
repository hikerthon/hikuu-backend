import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AccountEntity } from '../../share/entity/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity], 'mobile')],
  controllers: [UserController],
  providers: [Logger, UserService],
  exports: [UserService],
})
export class UserModule {
}
