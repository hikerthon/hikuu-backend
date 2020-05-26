import { Module, Logger } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { loadJWTSecret } from 'src/share/utils/utils';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: loadJWTSecret().secret,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    Logger,
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [AuthService]
})

export class AuthModule { }