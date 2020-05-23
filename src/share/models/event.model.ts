import { ApiProperty } from '@nestjs/swagger';

export enum EventStatus {
  Pending = 0,
  Processing = 1,
  Resolved = 2,
  Bad = 3
}

export class Event {
  @ApiProperty()
  hikeId: number;

  @ApiProperty()
  hikerId: number;

  @ApiProperty()
  reporter: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  long: number;

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

  @ApiProperty()
  status: EventStatus;
}
