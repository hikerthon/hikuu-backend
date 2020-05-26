import { Controller, Request, Get, Post, UseGuards, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private srv: AuthService,
    private _logger: Logger
  ) { _logger.setContext(AuthController.name); }


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // return req.user;
    this._logger.debug(`Post auth login email ${req.user.email}`);
    return this.srv.login(req.user);
  }
}
