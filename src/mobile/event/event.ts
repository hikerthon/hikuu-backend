import { ApiProperty } from '@nestjs/swagger';

export class Event {
  @ApiProperty()
  eType: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;
}