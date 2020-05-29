import { ApiProperty } from '@nestjs/swagger';
import { CheckinTimeByTodayDto } from './checkin.dto';
import { EventCountDto, EventDto, EventSoSDto } from './event.dto';
import { AllGPSDto } from './allgps.dto';
import { IsNumber } from 'class-validator';

export class DashboardDto {
  @ApiProperty()
  @IsNumber()
  hikesCount: number;

  @ApiProperty()
  @IsNumber()
  checkinCount: number;

  @ApiProperty({ type: CheckinTimeByTodayDto, isArray: true })
  checkinTime: CheckinTimeByTodayDto[];

  @ApiProperty()
  @IsNumber()
  sosCount: number;

  @ApiProperty()
  @IsNumber()
  offTrailHikerCount: number;

  @ApiProperty()
  @IsNumber()
  resolvedCount: number;

  @ApiProperty()
  @IsNumber()
  eventTotalCount: number;


  @ApiProperty()
  @IsNumber()
  unResolvedEventCount: number;

  @ApiProperty()
  @IsNumber()
  pendingCount: number;

  @ApiProperty()
  @IsNumber()
  infoCount: number;

  @ApiProperty()
  @IsNumber()
  cautionCount: number;

  @ApiProperty()
  @IsNumber()
  dangerCount: number;

  @ApiProperty()
  @IsNumber()
  emergencyCount: number;

  @ApiProperty({ type: AllGPSDto, isArray: true })
  allGps: AllGPSDto[];

  @ApiProperty({ type: EventSoSDto, isArray: true })
  eventSos: EventSoSDto[];


  public static fromEntity(hikeCount: number,
                           checkinCount: number,
                           checkinTime: CheckinTimeByTodayDto[],
                           sosCount: number,
                           offTrailHikerCount: number,
                           eventCount: EventCountDto,
                           sosInfo: EventSoSDto[],
                           allgps: AllGPSDto[]): DashboardDto {
    const it = new DashboardDto();
    it.hikesCount = hikeCount;
    it.checkinCount = checkinCount;
    it.checkinTime = checkinTime;
    it.sosCount = sosCount;
    it.offTrailHikerCount = offTrailHikerCount;

    it.eventTotalCount = eventCount.eventTotalCount;
    it.resolvedCount = eventCount.resolvedCount;
    it.unResolvedEventCount = eventCount.notResolvedCount;
    it.pendingCount = eventCount.pendingCount;

    it.infoCount = eventCount.infoCount;
    it.cautionCount = eventCount.cautionCount;
    it.dangerCount = eventCount.dangerCount;
    it.emergencyCount = eventCount.emergencyCount;
    it.allGps = allgps;
    it.eventSos = sosInfo;
    return it;
  }

}