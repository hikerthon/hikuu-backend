import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(
    private _logger: Logger,
    private readonly appService: AppService
  ) {
    _logger.setContext(AppController.name);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('log')
  getLogError(): string {
    this._logger.debug('debug');
    this._logger.error('error');
    this._logger.warn('warn');
    this._logger.log('log');
    this._logger.verbose('verbose');
    return this.appService.getHello();
  }
}
