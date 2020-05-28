import { ApiResponse, ApiTags, ApiOperation, ApiQuery, ApiParam, ApiConsumes } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Logger,
  Query,
  Param,
  UseInterceptors,
  HttpStatus,
  UploadedFile,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { AlertService } from './alert.service';
import { HikooResponse, CountResponseDto, ImageUploadResponse, HikooBadReqResponse } from '../../share/dto/generic.dto';
import { AlertDto, AlertViewDto } from 'src/share/dto/alert.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiFile, s3UploadAsync } from 'src/share/utils/utils';
import { InjectS3 } from 'nestjs-s3';
import { S3 } from 'aws-sdk';

@ApiTags('alert')
@Controller('alert')
export class AlertController {
  constructor(
    private alertSvc: AlertService,
    private _logger: Logger,
    @InjectS3() private readonly _s3: S3,
  ) {
    _logger.setContext(AlertController.name);
  }

  @Get()
  @ApiOperation({ summary: 'Get all alerts' })
  @ApiQuery({ name: 'startIndex', type: 'number', required: true })
  @ApiQuery({ name: 'count', type: 'number', required: true })
  @ApiResponse({ status: 200, type: AlertViewDto, isArray: true, description: 'Return list of alert' })
  async getAllAlert(
    @Query('startIndex') startIndex: number,
    @Query('count') count: number): Promise<AlertViewDto[]> {
    this._logger.debug(`@Get, startIndex = [${startIndex}], count = [${count}]`);
    startIndex = (startIndex !== null ? startIndex : 0);
    count = (count !== null ? count : 10);
    return this.alertSvc.getAllView(startIndex, count);
  }

  @Get('count')
  @ApiOperation({ summary: 'Get alert count' })
  @ApiResponse({ status: HttpStatus.OK, type: CountResponseDto, description: 'Return count of alert' })
  async allAlertCount(): Promise<CountResponseDto> {
    this._logger.debug(`@Get count`);
    return this.alertSvc.getCount();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Get alert detail' })
  @ApiResponse({ status: HttpStatus.OK, type: AlertViewDto, isArray: true, description: 'Return detail of alert' })
  async getAlertById(
    @Param('id') id: number): Promise<AlertViewDto> {
    this._logger.debug(`@Get, id = [${id}]`);
    return this.alertSvc.getViewById(id);
  }

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Create new Alert' })
  @ApiResponse({ status: HttpStatus.OK, type: HikooResponse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HikooBadReqResponse })
  async createAlert(@Body() alert: AlertDto): Promise<HikooResponse> {
    try {
      this._logger.debug(`@Post, info: ${alert.eventInfo}`);
      await this.alertSvc.create(alert);
      return { success: true };
    } catch (e) {
      throw new HttpException({ success: false, errorMessage: e.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @ApiResponse({ status: HttpStatus.OK, type: ImageUploadResponse, description: 'Successfully upload the image.' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ImageUploadResponse,
    description: 'Failed to upload the image.',
  })
  async uploadFile(@UploadedFile() file): Promise<ImageUploadResponse> {
    try {
      const out = await s3UploadAsync(this._s3, file);
      return { success: true, imagePath: out.Location };
    } catch (e) {
      throw new HttpException({ success: false, errorMessage: e.message }, HttpStatus.BAD_REQUEST);
    }
  }
}
