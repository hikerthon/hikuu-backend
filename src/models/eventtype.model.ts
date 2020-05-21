import { ApiProperty } from '@nestjs/swagger';

export class EventtypeModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  defAlert: number;
}