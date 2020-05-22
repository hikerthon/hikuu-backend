import { ApiProperty } from '@nestjs/swagger';

export class Event {
  @ApiProperty()
  hikeId: number;

  @ApiProperty()
  hikerId: number;

  @ApiProperty()
  hikerName: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  radius: number;

  @ApiProperty()
  alertId: number;

  @ApiProperty()
  alertLevel: string;

  @ApiProperty()
  eventId: number;

  @ApiProperty()
  eventType: string;

  @ApiProperty()
  eventInfo: string;

  @ApiProperty()
  eventTime: string;

  @ApiProperty()
  ttl: number;
}