import { ApiProperty } from '@nestjs/swagger';

export class SOS {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;
}
