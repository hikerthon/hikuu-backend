import { Module, Logger } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/share/entity/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  providers: [Logger, AccountService],
  controllers: [AccountController]
})
export class AccountModule {}
