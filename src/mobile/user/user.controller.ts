import {
  Controller,
  Request,
  Post,
  Body,
  Get,
  Logger,
  Put,
  UseGuards,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { HikooResponse, HikooBadReqResponse } from '../../share/dto/generic.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AccountDto } from '../../share/dto/account.dto';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private srv: UserService,
    private _logger: Logger,
  ) {
    _logger.setContext(UserController.name);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({ status: HttpStatus.OK, type: HikooResponse, description: 'successful operation' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: HikooResponse, description: 'Error: Unauthorized' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HikooBadReqResponse, description: 'Invalid user input' })
  async createUser(
    @Body() account: AccountDto,
  ): Promise<HikooResponse> {
    this._logger.debug(`Post Account info ${account.email}`);
    const result = await this.srv.create(account);
    if (!result) {
      throw new HttpException(
        { success: false, errorMessage: result.errorMessage },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user info' })
  @ApiResponse({ status: 200, type: HikooResponse, description: 'successful operation' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: HikooResponse, description: 'Error: Unauthorized' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HikooBadReqResponse, description: 'Invalid user input' })
  async updateUser(
    @Request() req,
    @Body() account: AccountDto,
  ): Promise<HikooResponse> {
    const userId = req.user.userId;
    this._logger.debug(`@Update, userId ${req.user.username} (${userId})`);
    // need check user permission
    const result = await this.srv.update(userId, account);
    if (!result) {
      throw new HttpException(
        { success: false, errorMessage: result.errorMessage },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, type: AccountDto, isArray: false, description: 'successful operation' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: HikooResponse, description: 'Error: Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: HikooResponse, description: 'Fail to get user profile' })
  async getUser(
    @Request() req,
  ): Promise<AccountDto> {
    const userId = req.user.userId;
    this._logger.debug('Find user infromation');

    try {
      return this.srv.getById(userId);
    } catch (e) {
      throw new HttpException(
        { success: false, errorMessage: e.errorMessage },
        HttpStatus.FORBIDDEN,
      );
    }


  }
}
