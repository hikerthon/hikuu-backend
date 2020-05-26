import { Controller, Request, Post, Body, Get, Param, Logger, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { HikooResponse } from '../../share/dto/generic.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AccountDto } from 'src/share/dto/account.dto';


@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private srv: UserService,
    private _logger: Logger,
  ) { _logger.setContext(UserController.name) }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: 200, type: HikooResponse, description: 'successful operation' })
  async createUser(
    @Body() account: AccountDto
  ): Promise<HikooResponse> {
    this._logger.debug(`Post Account info ${account.email}`);
    return await this.srv.create(account);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiOperation({ summary: 'Update user info' })
  @ApiResponse({ status: 200, type: HikooResponse, description: 'successful operation' })
  async updateUser(
    @Request() req,
    @Body() account: AccountDto,
  ): Promise<HikooResponse> {
    this._logger.debug(`update user info, userID ${account.id}`);
    // need check user permission
    return this.srv.update(account);
    // need handle error response
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, type: AccountDto, isArray: false, description: 'successful operation' })
  async getUser(
    @Request() req
  ): Promise<AccountDto> {
    this._logger.debug('Find user infromation');
    return this.srv.getById(req.user.userId)
  }
}
