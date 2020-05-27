import { Controller, Request, Get, Logger, Query, HttpStatus, UseGuards, HttpException } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { AroundMeService } from './aroundme.service';
import { AroundMeDto } from '../../share/dto/aroundme.dto';
import { UserLocationDto } from '../../share/dto/location.dto';
import { HikooResponse } from '../../share/dto/generic.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags("aroundme")
@Controller('aroundme')
export class AroundMeController {
  constructor(private srv: AroundMeService, private _logger: Logger) {
    _logger.setContext(AroundMeController.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all event within 3 km around the user' })
  @ApiQuery({ name: 'latpt', type: 'number', description: 'latitude value', required: true, example: 23.466305 })
  @ApiQuery({ name: 'lngpt', type: 'number', description: 'longitude value', required: true, example: 120.949836 })
  @ApiResponse({ status: HttpStatus.OK, type: AroundMeDto, description: 'Return list of event and alert within 3km around the user' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: HikooResponse, description: 'Error: Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: HikooResponse, description: 'Fail to get all event within 3 km around the user' })
  async getAroundMe(
    @Request() req,
    @Query('latpt') latpt: number,
    @Query('lngpt') lngpt: number
  ): Promise<AroundMeDto[]> {
    const userId = req.user.userId;
    this._logger.debug(`@Get AroundMe id = [${userId}] at [${latpt}, ${lngpt}]`);
    const location = new UserLocationDto()
    location.userId = userId;
    location.latpt = latpt;
    location.lngpt = lngpt;
    try {
      return await this.srv.getAroundMe(location)
    } catch (e) {
      throw new HttpException(
        { success: false, errorMessage: e.errorMessage },
        HttpStatus.FORBIDDEN
      );
    }
  }
}
