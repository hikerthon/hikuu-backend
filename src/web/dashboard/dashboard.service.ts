import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository, Between, In, Not } from 'typeorm';
import { subDays } from 'date-fns';

import { HikeEntity } from '../../share/entity/hike.entity';
import { EventEntity } from '../../share/entity/event.entity';
import { CheckinEntity } from '../../share/entity/checkin.entity';
import { AlertEntity } from '../../share/entity/alert.entity';

import { DashboardDto } from '../../share/dto/dashboard.dto';
import { CheckinTimeByTodayDto } from '../../share/dto/checkin.dto';
import { EventCountDto, EventSoSDto } from '../../share/dto/event.dto';
import { EventsGateway } from '../events/events.gateway';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AllGpsEntity } from '../../share/entity/allgps.entity';
import { AllGPSDto } from '../../share/dto/allgps.dto';


@Injectable()
export class DashboardService {

  constructor(
    @InjectRepository(HikeEntity) private readonly repoHike: Repository<HikeEntity>,
    @InjectRepository(EventEntity) private readonly repoEvent: Repository<EventEntity>,
    @InjectRepository(CheckinEntity) private readonly repoCheckin: Repository<CheckinEntity>,
    @InjectRepository(AlertEntity) private readonly repoAlert: Repository<AlertEntity>,
    @InjectRepository(AllGpsEntity) private readonly repoAllgps: Repository<AllGpsEntity>,
    private _eventGateway: EventsGateway,
  ) {

  }







  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {

    function formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [year, month, day].join('-');
    }

    const value = await this.getAll(new Date(formatDate(new Date(Date.now()))));
    this._eventGateway.newDashboard(value);
  }

  async getAll(startTime: Date): Promise<DashboardDto> {
    const betweenDate = Between(subDays(startTime, 3), startTime );

    const hikeCount = await this.repoHike.count({
      where: {
        logtime: betweenDate,
      },
    });

    const checkinCount = await this.repoCheckin.count({
      where: {
        checkinTime: betweenDate,
      }
    });

    const checkinTime = await this.repoCheckin.createQueryBuilder('checkin')
      .select('count(*), hour(checkin_time), checkin_time')
      // .where('checkin_time BETWEEN :st AND :end', { st: startTime, end: endTime })
      .groupBy('hour(checkin_time)')
      .getRawMany();


    const gpsData = await this.repoAllgps.find({
      where: {
        logtime: betweenDate,
      }
    });
    // console.log(gpsData)


    const sosInfo = await this.repoEvent.find({
      relations: ['reporter'],
      where: {
        eventTypeId: 4,
        eventTime: betweenDate,
        stat: Not('RESOLVED')
      },
    });

    const eventCounter = await getConnection().createQueryBuilder()
      .select(`SUM(CASE WHEN stat='RESOLVED' THEN 1 ELSE 0 END)`, 'eventResolvedCount')
      .addSelect(`SUM(CASE WHEN stat='PENDING' THEN 1 ELSE 0 END)`, 'eventPendingCount')
      .addSelect(`SUM(CASE WHEN stat='PENDING' OR stat='PROCESSING' THEN 1 ELSE 0 END)`, 'eventNotResolvedCount')
      .addSelect(`SUM(CASE WHEN alert_level_id = 1 THEN 1 ELSE 0 END)`, `infoCount`)
      .addSelect(`SUM(CASE WHEN alert_level_id = 2 THEN 1 ELSE 0 END)`, `cautionCount`)
      .addSelect(`SUM(CASE WHEN alert_level_id = 3 THEN 1 ELSE 0 END)`, `dangerCount`)
      .addSelect(`SUM(CASE WHEN alert_level_id = 4 THEN 1 ELSE 0 END)`, `emergencyCount`)
      .addSelect(`COUNT(id)`, 'eventTotalCount')
      .from('events', 'a')
      .where('event_time BETWEEN :st AND :end', { st: subDays(startTime, 3), end: startTime })
      .getRawOne()
      .then(row => EventCountDto.fromRawEntity(row));
    return DashboardDto.fromEntity(
      hikeCount,
      checkinCount,
      checkinTime.map(record => CheckinTimeByTodayDto.fromEntity(record)),
      0,
      0,
      eventCounter,
      sosInfo.map(sos => EventSoSDto.fromEntity(sos)),
      gpsData.map(gps => AllGPSDto.fromEntity(gps)));
  }
}
