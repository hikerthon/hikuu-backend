import { ApiProperty } from '@nestjs/swagger';

export class Location {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  location: string;
}
