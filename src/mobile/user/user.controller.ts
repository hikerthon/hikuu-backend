import { Controller, Post, Body, Get, Param, Logger, Put, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { HikooResponse } from '../../share/dto/generic.dto';
import { Account, LoginData } from '../../share/models/user.model';
import { UserToken } from 'src/share/dto/user.dto';


@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private srv: UserService,
    private _logger: Logger,
  ) { _logger.setContext(UserController.name) }


  @Get(':userId')
  @ApiOperation({ summary: 'Find user information by user id' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiResponse({ status: 200, type: Account, isArray: false, description: 'successful operation' })
  getUser(@Param('userId') userId: number): Account {
    this._logger.debug(`Find user infromation by user id [${userId}]`);
    return this.srv.getUser(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ type: Account })
  @ApiResponse({ status: 200, type: HikooResponse, description: 'successful operation' })
  createUser(@Body() account: Account): HikooResponse {
    this._logger.debug(`account [${account}]`);
    const r = this.srv.createUser(account);
    if (r) {
      return { success: true };
    } else {
      return { success: false, errorMessage: 'Fail to create user' };
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginData })
  @ApiResponse({ status: 200, type: HikooResponse, description: 'successful operation' })
  login(@Body() loginData: LoginData): HikooResponse {
    this._logger.debug(`Login data [${loginData}]`);
    const r = this.srv.login(loginData);
    if (r) {
      return { success: true };
    } else {
      return { success: false, errorMessage: 'Fail to login' };
    }
  }

  @Post('logout')
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, type: HikooResponse, description: 'successful operation' })
  logout(): HikooResponse {
    const r = this.srv.logout();
    if (r) {
      return { success: true };
    } else {
      return { success: false, errorMessage: 'Fail to logout' };
    }
  }

  @Put(':userId')
  @ApiOperation({ summary: 'Update user info' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiBody({ type: Account })
  @ApiResponse({ status: 200, type: Account, description: 'successful operation' })
  updateUser(@Body() account: Account, @Param('userId') userId: number): Account {
    this._logger.debug(`data need be updated [${account}]`);
    const newAccount = this.srv.updateUser(userId, account);
    return newAccount;
    // need handle error response

  }

  @Put('token')
  @ApiOperation({ summary: 'Update user FCM token' })
  @ApiBody({ type: UserToken })
  @ApiResponse({ status: HttpStatus.OK, type: HikooResponse, description: 'successful operation' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HikooResponse, description: 'bad request' })
  updateUserToken(@Body() userToken: UserToken): HikooResponse {

    // TODO: update user token

    return { success: true };
  }
}
