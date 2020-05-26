import { Controller, Get, Post, Body, Logger, Param, UseInterceptors, HttpStatus, UploadedFile, HttpException, Query, HttpService } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiParam, ApiQuery, ApiConsumes } from '@nestjs/swagger';
import { Event } from '../../share/models/event.model';
import { EventService } from './event.service';
import { HikooResponse, ImageUploadResponse } from '../../share/dto/generic.dto';
import { EventViewDto, EventDto } from 'src/share/dto/event.dto';
import { EventStatusEnum } from 'src/share/entity/event.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectS3 } from 'nestjs-s3';
import { S3 } from 'aws-sdk';
import { ApiFile, s3UploadAsync } from 'src/share/utils/utils';

@ApiTags('event')
@Controller('user')
export class EventController {
  constructor(
    private srv: EventService,
    private _logger: Logger,
    private _http: HttpService,
    @InjectS3() private readonly _s3: S3
  ) { _logger.setContext(EventController.name); }

  @Get(':userId/event')
  @ApiOperation({ summary: 'Find events by user id' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiQuery({ name: 'start', type: 'number', required: false })
  @ApiQuery({ name: 'count', type: 'number', required: false })
  @ApiResponse({ status: 200, type: Event, isArray: true, description: 'successful operation' })
  async getEventsByHikeId(
    @Param('userId') userId: number,
    @Query('start') start: number,
    @Query('count') count: number): Promise<EventViewDto[]> {
    this._logger.debug(`@Get, userId = [${userId}], start = [${start}], count = [${count}]`)
    start = (start != null ? start : 0);
    count = (count != null ? count : 10);
    // count must more than 0
    return this.srv.getByHikeId(userId, start || 0, count || 0);
  }

  @Post(':userId/event')
  @ApiOperation({ summary: 'Create new event' })
  @ApiParam({ name: 'userId', type: 'number' })
  @ApiResponse({ status: 200, type: HikooResponse, description: 'successful operation' })
  async createEvent(@Body() event: EventDto, @Param('userId') userId: number): Promise<HikooResponse> {
    this._logger.debug(`@Post, userId = [${userId}], info: ${event.eventInfo}`);
    event.stat = EventStatusEnum.PENDING;
    this._http
      .post<HikooResponse>('http://0.0.0.0:3000/event/notify', event)
      .subscribe(() => {
        this._logger.error(`Successfully notify platform`);
      }, err => {
        this._logger.error(`Failed to notify platform - ${err.errorMessage}`);
      });
    return await this.srv.create(event);
  }

  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @ApiResponse({ status: HttpStatus.OK, type: ImageUploadResponse, description: 'Successfully upload the image.' })
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
