import {
  Controller,
  UseInterceptors,
  Get,
  Post,
  Logger,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { S3, InjectS3 } from 'nestjs-s3';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from '@nestjs/swagger';
import { HikooResponse } from './share/dto/generic.dto';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';

@Controller()
export class AppController {

  constructor(
    private _logger: Logger,
    private readonly appService: AppService,
    @InjectS3() private readonly _s3: S3,
  ) {
    _logger.setContext(AppController.name);

    _s3.listBuckets((err, data) => {

      if (err) {
        console.log(err);
        return;
      }

      console.log(data.Buckets);
    });
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({ status: HttpStatus.OK, type: HikooResponse, description: 'Delete example object.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HikooResponse, description: 'Failed to delete example object.' })
  async uploadFile(@UploadedFile() file): Promise<HikooResponse> {
    console.log(file);

    try {
      const out = await this.s3UploadAsync(file);
      return { success: true, errorMessage: out.Location };
    } catch (e) {
      throw new HttpException({ success: false, errorMessage: e.message }, HttpStatus.BAD_REQUEST);
    }
  }

  s3UploadAsync(file): Promise<ManagedUpload.SendData> {
    return new Promise((resolve, reject) => {
      this._s3.upload({
        ACL: 'public-read',
        Body: file.buffer,
        Bucket: 'hikoo',
        Key: file.originalname,
      }, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  }
}
