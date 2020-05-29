import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsNumber } from 'class-validator';

export class HikooResponse {
  @ApiProperty()
  @IsBoolean()
  success: boolean;

  @ApiProperty()
  @IsString()
  errorMessage?: string;

  constructor(success: boolean, message: string) {
    this.success = success;
    this.errorMessage = message;
  }
}

export class HikooBadReqResponse {
  @ApiProperty({ readOnly: true, default: 400, example: 400 })
  statusCode: number;

  @ApiProperty({ isArray: true })
  @IsString()
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  @IsString()
  error: string;

  constructor(statusCode: number, message: string, error: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}

export class HikooISEResponse {
  @ApiProperty({ readOnly: true, default: 500, example: 500 })
  statusCode: number;

  @ApiProperty({ isArray: true })
  @IsString()
  message: string;

  @ApiProperty({ example: 'INTERNAL SERVER ERROR' })
  @IsString()
  error: string;

  constructor(statusCode: number, message: string, error: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}

export class ImageUploadResponse extends HikooResponse {
  @ApiProperty()
  @IsString()
  imagePath?: string;
}

export class CountResponseDto {
  @ApiProperty()
  @IsBoolean()
  success: boolean;

  @ApiProperty()
  @IsNumber()
  count: number;

  @ApiProperty()
  @IsString()
  errorMessage?: string;
}