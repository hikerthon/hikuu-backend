import { ApiProperty } from '@nestjs/swagger';

export class Location {
  @ApiProperty()
  lat: string;

  @ApiProperty()
  long: string;
}
