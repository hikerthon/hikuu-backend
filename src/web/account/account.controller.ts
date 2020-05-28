import { Controller, Logger, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { AccountDto } from 'src/share/dto/account.dto';
import { HikooResponse } from 'src/share/dto/generic.dto';

@ApiTags('accounts')
@Controller('accounts')
export class AccountController {

  constructor(private accountsSvc: AccountService, private _logger: Logger) {
    _logger.setContext(AccountController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get account list' })
  @ApiResponse({ status: 200, type: AccountDto, isArray: true, description: 'Get account list' })
  async getAll(): Promise<AccountDto[]> {
    this._logger.debug('get all account');
    return this.accountsSvc.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get account info by id' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, type: AccountDto, description: 'Get account info by id' })
  @ApiResponse({ status: 404, type: HikooResponse, description: 'Get account info by id failed' })
  async getById(@Param('id') id: number): Promise<AccountDto> {
    this._logger.debug(`get account id [${id}]`);
    const out = this.accountsSvc.getById(id);

    if (!out) {
      throw new HttpException({
          success: false,
          errorMessage: `Cannot find user with id ${id}`
        }, HttpStatus.NOT_FOUND);
    }

    return out;
  }

  @Get('/withemail/:email')
  @ApiOperation({ summary: 'Get account info by email' })
  @ApiParam({ name: 'email', type: 'string' })
  @ApiResponse({ status: 200, type: AccountDto, description: 'Get account info by email' })
  @ApiResponse({ status: 404, type: HikooResponse, description: 'Get account info by email failed' })
  async getByEmail(@Param('email') email: string): Promise<AccountDto> {
    this._logger.debug(`get account email [${email}]`);
    const out = await this.accountsSvc.getByEmail(email);

    if (!out) {
      throw new HttpException({
          success: false,
          errorMessage: `Cannot find user with email ${email}`
        }, HttpStatus.NOT_FOUND);
    }

    return out;
  }
}
