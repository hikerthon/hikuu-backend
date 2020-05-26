import { Controller, Request, Get, Post, UseGuards, Logger, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IsDefined, IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginData {

  @ApiProperty({ type: 'email' })
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string', maxLength: 255, minLength: 4 })
  @IsDefined()
  @MaxLength(255)
  @MinLength(4)
  password: string;
}

export class JwtData {
  @ApiProperty()
  accessToken: string
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private srv: AuthService,
    private _logger: Logger
  ) { _logger.setContext(AuthController.name); }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  async login(
    @Request() req,
    @Body() loginData: LoginData
  ): Promise<JwtData> {
    // return req.user;
    this._logger.debug(`Post auth login email ${req.user.email}`);
    return this.srv.login(req.user);
  }
}
