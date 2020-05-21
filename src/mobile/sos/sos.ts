import { ApiProperty } from '@nestjs/swagger';

export class SOS {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  lat: string;

  @ApiProperty()
  long: string;
}
