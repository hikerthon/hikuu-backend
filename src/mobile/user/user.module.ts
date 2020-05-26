import { Module, Logger } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/share/entity/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity], 'mobile')],
  controllers: [UserController],
  providers: [Logger, UserService],
  exports: [UserService]
})
export class UserModule { }
