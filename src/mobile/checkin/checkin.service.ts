import { Injectable } from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HikooResponse } from 'src/share/dto/generic.dto';
import { CheckinEntity } from 'src/share/entity/checkin.entity';
import { CheckinDto } from 'src/share/dto/checkin.dto';
import { HikeEntity, PermitReqStatEnum } from 'src/share/entity/hike.entity';

@Injectable()
export class CheckInService {

  constructor(
    @InjectRepository(CheckinEntity, 'mobile')
    private readonly repo: Repository<CheckinEntity>
  ) { }

  async sendCheckIn(hikerId: number, hikeId: number): Promise<HikooResponse> {
    try {
      // make sure hike id exist, have the same hiker id, and not yet started
      const thisHike = await getConnection('mobile')
      .createQueryBuilder()
      .select('id')
      .from(HikeEntity, 'hike')
      .where('hike_started=0')
      .andWhere('hike_finished=0')
      .andWhere('hike_end > NOW()')
      .andWhere('permit_accepted=:stat', {stat: PermitReqStatEnum.ACCEPTED})
      .andWhere('hiker_id=:id', {id: hikerId})
      .orderBy('hike_start', 'DESC')
      .getRawOne();

    if (thisHike.id != hikeId) {
      return new HikooResponse(false, 'This user does not have this hiking plan!')
    }

      // insert to checkin table
      const saveThis = new CheckinDto();
      saveThis.hikeId = hikeId;
      saveThis.hikerId = hikerId;
      await this.repo.save(saveThis.toEntity());

      // update hikes table set hiking started
      await getConnection('mobile')
        .createQueryBuilder()
        .update(HikeEntity)
        .set( {hikeStarted: true} )
        .where("id= :id", { id: saveThis.hikeId })
        .execute();
    } catch (e) {
      return new HikooResponse(false, e.message);
    }

    return new HikooResponse(true, null);
  }

  async sendCheckOut(hikerId: number, hikeId: number): Promise<HikooResponse> {
    try {
      // make sure hike id exist, have the same hiker id, started but not finished
      const thisHike = await getConnection('mobile')
        .createQueryBuilder()
        .select('id')
        .from(HikeEntity, 'hike')
        .where('hike_started=1')
        .andWhere('hike_finished=0')
        .andWhere('hike_end > NOW()')
        .andWhere('permit_accepted=:stat', {stat: PermitReqStatEnum.ACCEPTED})
        .andWhere('hiker_id=:id', {id: hikerId})
        .orderBy('hike_start', 'DESC')
        .getRawOne();

      if (thisHike.id != hikeId) {
        return new HikooResponse(false, 'This user does not have this hiking plan!')
      }

      // update hikes table set hiking started
      await getConnection('mobile')
        .createQueryBuilder()
        .update(HikeEntity)
        .set( {hikeFinished: true} )
        .where("id= :id", { id: hikeId })
        .execute();
    } catch (e) {
      return new HikooResponse(false, e.message);
    }

    return new HikooResponse(true, null);
  }
}
