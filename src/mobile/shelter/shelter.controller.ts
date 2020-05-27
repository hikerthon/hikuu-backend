import { Controller, Request, Logger, Get, Query, HttpStatus, UseGuards, HttpException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ShelterService } from './shelter.service'
import { ShelterAroundMeDto } from '../../share/dto/shelter.dto';
import { UserLocationDto } from '../../share/dto/location.dto';
import { HikooResponse } from '../../share/dto/generic.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('shelter')
@Controller('shelter')
export class ShelterController {
  constructor(private srv: ShelterService, private _logger: Logger) {
    _logger.setContext(ShelterController.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get 5 nearby shelters from current location' })
  @ApiQuery({ name: 'latpt', type: 'number', description: 'latitude value', required: true, example: 23.466305 })
  @ApiQuery({ name: 'lngpt', type: 'number', description: 'longitude value', required: true, example: 120.949836 })
  @ApiResponse({ status: 200, type: ShelterAroundMeDto, isArray: true, description: 'successful operation' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: HikooResponse, description: 'Error: Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: HikooResponse, description: 'Fail to get 5 nearby shelters from current location' })
  async getNearbyShelters(
    @Request() req,
    @Query('latpt') latpt: number,
    @Query('lngpt') lngpt: number
  ): Promise<ShelterAroundMeDto[]> {
    const userId = req.user.userId;
    this._logger.debug(`@Get Shelter around id = [${userId}] at [${latpt}, ${lngpt}]`);
    const location = new UserLocationDto()
    location.userId = userId;
    location.latpt = latpt;
    location.lngpt = lngpt;
    try {
      return this.srv.getNearbyShelters(location);
    } catch (e) {
      throw new HttpException(
        { success: false, errorMessage: e.errorMessage },
        HttpStatus.FORBIDDEN
      );
    }
  }
}