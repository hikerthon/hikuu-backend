import { ApiProperty } from '@nestjs/swagger';

export class Shelter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  location: string;
}
