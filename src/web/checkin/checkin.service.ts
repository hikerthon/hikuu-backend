import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';

import { CheckinEntity } from '../../share/entity/checkin.entity';
import { CheckinCreateDto, CheckinDto } from '../../share/dto/checkin.dto';
import { HikooResponse } from '../../share/dto/generic.dto';
import { HikeEntity, PermitReqStatEnum } from '../../share/entity/hike.entity';

@Injectable()
export class CheckinService {
  constructor(
    @InjectRepository(CheckinEntity)
    private readonly repo: Repository<CheckinEntity>,
  ) {
  }

  async getCheckinRecordById(hikeId: number): Promise<CheckinDto[]> {
    const records = await this.repo.find({
      relations: ['hiker', 'hike'],
      where: { hikeId },
    });
    return records.map(record => CheckinDto.fromEntity(record));
  }

  async sendCheckIn(checkin: CheckinCreateDto): Promise<HikooResponse> {
    try {

      // make sure hike id exist, have the same hiker id, and not yet started
      const thisHike = await getConnection('mobile')
        .createQueryBuilder()
        .select('id, hike_started, hike_finished')
        .from(HikeEntity, 'hike')
        .where('hike_end > NOW()')
        .andWhere('permit_accepted=:stat', { stat: PermitReqStatEnum.ACCEPTED })
        .andWhere('hiker_id=:id', { id: checkin.hikerId })
        .orderBy('hike_start', 'DESC')
        .getRawOne();

      if (!thisHike || thisHike.id != checkin.hikeId) {
        return new HikooResponse(false, 'This user does not have this hiking plan!');
      } else if (thisHike.hike_started == true) {
        return new HikooResponse(false, 'This hiking plan has already started!');
      } else if (thisHike.hike_finished == true) {
        return new HikooResponse(false, 'This hiking plan has already finished!');
      }

      // insert to checkin table
      const saveThis = new CheckinDto();
      saveThis.hikeId = checkin.hikeId;
      saveThis.hikerId = checkin.hikerId;
      await this.repo.save(saveThis.toEntity());

      // update hikes table set hiking started
      await getConnection('mobile')
        .createQueryBuilder()
        .update(HikeEntity)
        .set({ hikeStarted: true })
        .where('id= :id', { id: saveThis.hikeId })
        .execute();
    } catch (e) {
      return new HikooResponse(false, e.message);
    }

    return new HikooResponse(true, null);
  }
}
