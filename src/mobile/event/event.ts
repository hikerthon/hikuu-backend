import { ApiProperty } from '@nestjs/swagger';

export class Event {
  @ApiProperty()
  eType: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  userId: number;
}