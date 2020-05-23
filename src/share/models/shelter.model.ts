import { ApiProperty } from '@nestjs/swagger';

export class Shelter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;

}
