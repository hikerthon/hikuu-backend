import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HikeEntity } from '../../share/entity/hike.entity';
import { EventEntity } from '../../share/entity/event.entity';
import { CheckinEntity } from '../../share/entity/checkin.entity';
import { AlertEntity } from '../../share/entity/alert.entity';

import { AlertCountDto, DashboardDto } from '../../share/dto/dashboard.dto';
import { CheckinTimeByTodayDto } from '../../share/dto/checkin.dto';
import { EventCountDto } from '../../share/dto/event.dto';



@Injectable()
export class DashboardService {

  constructor(
    @InjectRepository(HikeEntity)  private readonly repoHike: Repository<HikeEntity>,
    @InjectRepository(EventEntity)  private readonly repoEvent: Repository<EventEntity>,
    @InjectRepository(CheckinEntity)  private readonly repoCheckin: Repository<CheckinEntity>,
    @InjectRepository(AlertEntity)  private readonly repoAlert: Repository<AlertEntity>,
  ) {}

  async getAll(): Promise<DashboardDto> {
    const hikeCount = await this.repoHike.count()
    const checkinCount = await this.repoCheckin.count()
    const eventCount = await this.repoEvent.createQueryBuilder("events")
      .select("stat, count(*)")
      .groupBy('stat')
      .getRawMany()
    const checkinTime = await this.repoCheckin.createQueryBuilder("checkin")
      .select('count(*), hour(checkin_time)')
      .groupBy('hour(checkin_time)')
      .getRawMany()
    const alertCount = await this.repoAlert.createQueryBuilder("alerts")
      .select('alert_level_id, count(*)')
      .groupBy('alert_level_id')
      .getRawMany()

    return DashboardDto.fromEntity(
      hikeCount,
      checkinCount,
      checkinTime.map(record => CheckinTimeByTodayDto.fromEntity(record)) ,
      0,
      0,
      EventCountDto.fromEntity(eventCount),
      AlertCountDto.fromEntity(alertCount));
  }
}
