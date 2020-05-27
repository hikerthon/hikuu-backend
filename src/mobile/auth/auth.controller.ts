import {
  Controller,
  Request,
  Post,
  UseGuards,
  Logger,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDataDto, JwtDataDto } from '../../share/dto/logindata.dto';
import { HikooBadReqResponse } from '../../share/dto/generic.dto';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private srv: AuthService,
    private _logger: Logger,
  ) {
    _logger.setContext(AuthController.name);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: HttpStatus.OK, type: JwtDataDto, description: 'successful operation' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: HikooBadReqResponse,
    description: 'Invalid username/ password supplied',
  })
  async login(
    @Request() req,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() loginData: LoginDataDto,
  ): Promise<JwtDataDto> {
    try {
      this._logger.debug(`Post auth login email ${req.user.email}`);
      return await this.srv.login(req.user);
    } catch (e) {
      throw new HttpException(
        { success: false, errorMessage: e.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
