import { Controller, Logger, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { AccountDto } from 'src/share/dto/account.dto';

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
    async getById(@Param('id') id: number): Promise<AccountDto> {
      this._logger.debug(`get account id [${id}]`);
      return this.accountsSvc.getById(id);
    }
}
