import { ApiProperty } from '@nestjs/swagger';

export class Alert {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  sender: string;

  @ApiProperty()
  date: string;

}