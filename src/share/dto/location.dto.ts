import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max } from 'class-validator';

export class LocationDto {
  @ApiProperty({ nullable: false, minimum: -90, maximum: 90, example: 24.1177877 })
  @IsNumber()
  @Min(-90)
  @Max(90)
  latpt: number;

  @ApiProperty({ nullable: false, minimum: -180, maximum: 180, example: 121.3103961 })
  @IsNumber()
  @Min(-180)
  @Max(180)
  lngpt: number;
}


export class UserLocationDto extends LocationDto {
  @ApiProperty({ nullable: false })
  @IsNumber()
  userId: number;
}