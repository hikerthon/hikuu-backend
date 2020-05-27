import { Injectable } from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HikooResponse } from 'src/share/dto/generic.dto';
import { CheckinEntity } from 'src/share/entity/checkin.entity';
import { CheckinDto } from 'src/share/dto/checkin.dto';
import { HikeEntity } from 'src/share/entity/hike.entity';

@Injectable()
export class CheckInService {

  constructor(
    @InjectRepository(CheckinEntity, 'mobile')
    private readonly repo: Repository<CheckinEntity>
  ) { }

  async sendCheckIn(track: CheckinDto): Promise<HikooResponse> {
    try {
      // make sure hike id exist, have the same hiker id, and not yet started

      // insert to checkin table
      const saveThis = Object.assign(new CheckinDto(), track);
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
}
