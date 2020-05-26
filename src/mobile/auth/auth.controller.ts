import { Controller, Request, Get, Post, UseGuards, Logger, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IsDefined } from 'class-validator';

export class LoginData {
  @ApiProperty()
  @IsDefined()
  email: string;

  @ApiProperty()
  @IsDefined()
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
