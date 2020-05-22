import { ApiProperty } from '@nestjs/swagger';


export class AlertLevel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  ttl: number;

  @ApiProperty()
  radius: number;
}