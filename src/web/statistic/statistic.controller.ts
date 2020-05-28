
import { Controller, Get, Logger, Query } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { StatisticDto } from 'src/share/dto/statistic.dto';

@Controller('statistic')
export class StatisticController {

    constructor(private statisticSvc: StatisticService, private _logger: Logger) {
      _logger.setContext(StatisticController.name);
    }

    @Get()
    @ApiOperation({ summary: 'Get statistic data' })
    @ApiQuery({ name: 'start', type: 'string', required: true })
    @ApiQuery({ name: 'end', type: 'string', required: true })
    @ApiResponse({ status: 200, type: StatisticDto, description: 'Successful operation' })
    async getAll(
        @Query('start') start: Date,
        @Query('end') end: Date): Promise<StatisticDto> {
      this._logger.debug(`@Get start [${start}], end [${end}]`);
      return this.statisticSvc.getAll(start, end);
    }

}
