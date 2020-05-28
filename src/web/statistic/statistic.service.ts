import { Injectable } from '@nestjs/common';
import { StatisticDto, HikeStatisticDto, PermitStatisticDto, EventStatisticDto, EventTypeStatisticDto, SosStatisticDto } from 'src/share/dto/statistic.dto';
import { getConnection } from 'typeorm';

@Injectable()
export class StatisticService {
    // constructor(
    //   @InjectRepository(StationEntity)
    //   private readonly repo: Repository<StationEntity>,
    // ) {}
  
    async getAll(startTime: Date, endTime: Date): Promise<StatisticDto> {
      
      const hikeCounter = await getConnection().createQueryBuilder()
        .select('SUM(CASE WHEN hike_started=1 AND hike_finished=0 THEN 1 ELSE 0 END)', 'hikeActiveCount')
        .addSelect('SUM(CASE WHEN hike_finished=1 THEN 1 ELSE 0 END)', 'hikeFinishedCount')
        .addSelect('SUM(CASE WHEN hike_cancelled=0 THEN 1 ELSE 0 END)', 'hikeCancelledCount')
        .addSelect('COUNT(id)', 'hikeTotalCount')
        .from('hikes', 'a')
        .where('hike_start BETWEEN :st AND :end', {st: startTime, end: endTime})
        .getRawOne()
        .then( row => HikeStatisticDto.fromRawEntity(row) );
      
      const permitCounter = await getConnection().createQueryBuilder()
        .select('b.permit_name', 'permitName')
        .addSelect(`SUM(CASE WHEN permit_accepted='PENDING' THEN 1 ELSE 0 END)`, 'pendingCount')
        .addSelect(`SUM(CASE WHEN permit_accepted='ACCEPTED' THEN 1 ELSE 0 END)`, 'acceptedCount')
        .addSelect(`SUM(CASE WHEN permit_accepted='REJECTED' THEN 1 ELSE 0 END)`, 'rejectedCount')
        .from('hikes', 'a')
        .innerJoin('permits', 'b', 'a.permit_id = b.id')
        .where('hike_start BETWEEN :st AND :end', {st: startTime, end: endTime})
        .groupBy('a.permit_id')
        .getRawMany()
        .then( rows => rows.map( row => PermitStatisticDto.fromRawEntity(row) ));
      
      const eventCounter = await getConnection().createQueryBuilder()
        .select(`SUM(CASE WHEN stat='RESOLVED' THEN 1 ELSE 0 END)`, 'eventResolvedCount')
        .addSelect(`SUM(CASE WHEN stat='PENDING' OR stat='PROCESSING' THEN 1 ELSE 0 END)`, 'eventNotResolvedCount')
        .addSelect(`COUNT(id)`, 'eventTotalCount')
        .from('events', 'a')
        .where('event_type_id != 4')
        .andWhere('event_time BETWEEN :st AND :end', {st: startTime, end: endTime})
        .getRawOne()
        .then( row => EventStatisticDto.fromRawEntity(row) );

      const eventTypeCounter = await getConnection().createQueryBuilder()
        .select(`b.event_type_name`, 'eventTypeName')
        .addSelect(`COUNT(a.id)`, 'eventTypeCount')
        .from('events', 'a')
        .innerJoin('event_type', 'b', 'a.event_type_id=b.id')
        .where('event_type_id != 4')
        .andWhere('event_time BETWEEN :st AND :end', {st: startTime, end: endTime})
        .groupBy('a.event_type_id')
        .getRawMany()
        .then( rows => rows.map( row => EventTypeStatisticDto.fromRawEntity(row) ));

      const sosCounter = await getConnection().createQueryBuilder()
        .select(`SUM(CASE WHEN stat='RESOLVED' THEN 1 ELSE 0 END)`, 'sosResolvedCount')
        .addSelect(`SUM(CASE WHEN stat='PENDING' OR stat='PROCESSING' THEN 1 ELSE 0 END)`, 'sosNotResolvedCount')
        .addSelect(`SUM(CASE WHEN stat='BAD' THEN 1 ELSE 0 END)`, 'sosFakeCount')
        .addSelect(`COUNT(id)`, 'sosTotalCount')
        .from('events', 'a')
        .where('event_type_id != 4')
        .andWhere('event_time BETWEEN :st AND :end', {st: startTime, end: endTime})
        .getRawOne()
        .then( row => SosStatisticDto.fromRawEntity(row) );
      
      const checkInCounter = await getConnection().createQueryBuilder()
        .select('COUNT(hike_id)', 'checkInCounter')
        .from('checkin', 'a')
        .where('checkin_time BETWEEN :st AND :end', {st: startTime, end: endTime})
        .getRawOne()
        .then( row => (row? row.checkInCounter : 0));
        

      const statistics = new StatisticDto();
      statistics.hikeCounter = hikeCounter;
      statistics.permitCounter = permitCounter;
      statistics.eventCounter = eventCounter;
      statistics.eventTypeCounter = eventTypeCounter;
      statistics.sosCounter = sosCounter;
      statistics.checkInCounter = checkInCounter;

      return statistics;
    }
}
