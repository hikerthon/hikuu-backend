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