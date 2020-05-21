import { ApiProperty } from '@nestjs/swagger';

export class Location {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  lat: string;

  @ApiProperty()
  long: string;
}
