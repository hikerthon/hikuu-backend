
import { ApiProperty } from '@nestjs/swagger';

export class Account {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}