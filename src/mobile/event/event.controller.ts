import { Controller, Request, Get, Post, Body, Logger, UseInterceptors, HttpStatus, UploadedFile, HttpException, Query, HttpService, UseGuards, HttpCode } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiQuery, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { Event } from '../../share/models/event.model';
import { EventService } from './event.service';
import { HikooResponse, ImageUploadResponse, HikooBadReqResponse } from '../../share/dto/generic.dto';
import { EventViewDto, EventDto } from 'src/share/dto/event.dto';
import { EventStatusEnum } from 'src/share/entity/event.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectS3 } from 'nestjs-s3';
import { S3 } from 'aws-sdk';
import { ApiFile, s3UploadAsync } from 'src/share/utils/utils';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(
    private srv: EventService,
    private _logger: Logger,
    private _http: HttpService,
    @InjectS3() private readonly _s3: S3
  ) { _logger.setContext(EventController.name); }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Find events by user id' })
  @ApiQuery({ name: 'start', type: 'number', required: false })
  @ApiQuery({ name: 'count', type: 'number', required: false })
  @ApiResponse({ status: HttpStatus.OK, type: Event, isArray: true, description: 'successful operation' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: HikooResponse, description: 'Error: Unauthorized' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HikooBadReqResponse, description: 'Invalid start / count supplied' })
  async getEventsByHikeId(
    @Request() req,
    @Query('start') start: number,
    @Query('count') count: number): Promise<EventViewDto[]> {

    try {
      const userId = req.user.userId;
      this._logger.debug(`@Get, userId = [${userId}], start = [${start}], count = [${count}]`)
      start = (start !== null ? start : 0);
      count = (count !== null ? count : 10);
      // count must more than 0
      return this.srv.getByHikeId(userId, start || 0, count || 0);
    } catch (e) {
      throw new HttpException(
        { success: false, errorMessage: e.message },
        HttpStatus.BAD_REQUEST
      );
    }

  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create new event' })
  @ApiResponse({ status: HttpStatus.OK, type: HikooResponse, description: 'successful operation' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: HikooResponse, description: 'Error: Unauthorized' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HikooBadReqResponse, description: 'Invalid event input' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, type: HikooResponse, description: 'Fail to create event' })
  async createEvent(
    @Request() req,
    @Body() event: EventDto,
  ): Promise<HikooResponse> {
    const userId = req.user.userId;

    this._logger.debug(`@Post, userId = [${userId}], info: ${event.eventInfo}`);

    // notify platform
    event.stat = EventStatusEnum.PENDING;
    this._http
      .post<HikooResponse>('http://0.0.0.0:3000/event/notify', event)
      .subscribe(() => {
        this._logger.error(`Successfully notify platform`);
      }, err => {
        this._logger.error(`Failed to notify platform - ${err.errorMessage}`);
        throw new HttpException(
          { success: false, errorMessage: `Failed to notify platform - ${err.errorMessage}` },
          HttpStatus.FORBIDDEN
        );
      });

    // save to db
    try {
      return await this.srv.create(event);
    } catch (e) {
      throw new HttpException(
        { success: false, errorMessage: e.message },
        HttpStatus.FORBIDDEN
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('uploadImage')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @ApiResponse({ status: HttpStatus.OK, type: ImageUploadResponse, description: 'Successfully upload the image.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, type: HikooResponse, description: 'Error: Unauthorized' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ImageUploadResponse, description: 'Failed to upload the image.' })
  async uploadFile(@UploadedFile() file): Promise<ImageUploadResponse> {
    try {
      const out = await s3UploadAsync(this._s3, file);
      return { success: true, imagePath: out.Location };
    } catch (e) {
      throw new HttpException({ success: false, errorMessage: e.message }, HttpStatus.BAD_REQUEST);
    }
  }
}
