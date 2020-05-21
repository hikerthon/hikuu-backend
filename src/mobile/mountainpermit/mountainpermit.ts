import { ApiProperty } from '@nestjs/swagger';

export class MountainPermit {
  @ApiProperty()
  mountainName: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  status: string;
}