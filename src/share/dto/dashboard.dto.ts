import { ApiProperty } from '@nestjs/swagger';
import { CheckinTimeByTodayDto } from './checkin.dto';
import { EventCountDto } from './event.dto';
import { IsNumber } from 'class-validator';

export class DashboardDto {
  @ApiProperty()
  @IsNumber()
  hikesCount: number;

  @ApiProperty()
  @IsNumber()
  checkinCount: number;

  @ApiProperty({type: CheckinTimeByTodayDto, isArray: true})
  checkinTime: CheckinTimeByTodayDto[];

  @ApiProperty()
  @IsNumber()
  sosCount: number;

  @ApiProperty()
  @IsNumber()
  offTrailHikerCount: number;

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


  public static fromEntity(hikeCount: number,
                           checkinCount: number,
                           checkinTime: CheckinTimeByTodayDto[],
                           sosCount: number,
                           offTrailHikerCount: number,
                           eventCount: EventCountDto,
                           alertCount: AlertCountDto): DashboardDto {
    const it = new DashboardDto();


    it.hikesCount = hikeCount;
    it.checkinCount = checkinCount;
    it.checkinTime = checkinTime;
    it.sosCount = sosCount;
    it.offTrailHikerCount = offTrailHikerCount;
    it.unResolvedEventCount = eventCount.resolved;
    it.pendingCount = eventCount.pendingCount;
    it.infoCount = alertCount.infoCount;
    it.cautionCount = alertCount.cautionCount
    return it;
  }

}

export class AlertCountDto {

  @ApiProperty({type: Number, default: 0})
  infoCount: number;

  @ApiProperty({type: Number, default: 0})
  cautionCount: number;

  @ApiProperty({type: Number, default: 0})
  dangerCount: number;

  @ApiProperty({type: Number, default: 0})
  emergencyCount: number;

  constructor(infoCount: number, cautionCount: number, dangerCount: number, emergencyCount: number) {
    this.infoCount = infoCount;
    this.cautionCount = cautionCount;
    this.dangerCount = dangerCount;
    this.emergencyCount = emergencyCount;
  }

  public static fromEntity(entity: any): AlertCountDto {
    const it = new AlertCountDto(0, 0, 0, 0);
    entity.forEach(e => {
      switch (e['alert_level_id']) {
        case 1:
          it.infoCount = Number(e['count(*)'])
          break
        case 2:
          it.cautionCount = Number(e['count(*)'])
          break
        case 3:
          it.dangerCount = Number(e['count(*)'])
          break
        case 4:
          it.emergencyCount = Number(e['count(*)'])
          break
      }
    })
    return it;
  }
}