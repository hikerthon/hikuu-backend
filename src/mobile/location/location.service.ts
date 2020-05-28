import { Injectable } from '@nestjs/common';
import { Repository, getManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackerDto } from '../../share/dto/tracker.dto';
import { TrackerEntity } from '../../share/entity/tracker.entity';
import { HikooResponse } from '../../share/dto/generic.dto';

@Injectable()
export class LocationService {

  constructor(
    @InjectRepository(TrackerEntity, 'mobile')
    private readonly repo: Repository<TrackerEntity>
  ) {
  }

  async sendLocation(track: TrackerDto): Promise<HikooResponse> {
    try {
      // Cannot do plain insert due to hikerId is PK. Must use on duplicate key update
      // But typeORM doesnt support this feature with query builder
      const trackDto = Object.assign(new TrackerDto(), track);
      const savedTrack = trackDto.toEntity()

      await getManager()
        .query(`
        INSERT INTO tracker(hiker_id, hike_id, record_time, latpt, lngpt, elevation, battery, network, elapsed_time) VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
          hike_id=VALUES(hike_id),
          record_time=VALUES(record_time),
          latpt=VALUES(latpt),
          lngpt=VALUES(lngpt),
          elevation=VALUES(elevation),
          battery=VALUES(battery),
          network=VALUES(network),
          elapsed_time=VALUES(elapsed_time),
          logtime=NOW();`, [
          savedTrack.hikerId, savedTrack.hikeId, savedTrack.recordTime, savedTrack.latpt, savedTrack.lngpt, savedTrack.elevation, savedTrack.battery, savedTrack.network, savedTrack.elapsedTime,
        ]);
    } catch (e) {
      return new HikooResponse(false, e.message);
    }

    return new HikooResponse(true, null);
  }
}
