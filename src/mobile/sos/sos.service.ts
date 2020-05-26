import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { EventEntity } from 'src/share/entity/event.entity';
import { EventDto } from 'src/share/dto/event.dto';
import { HikooResponse } from 'src/share/dto/generic.dto';
import { HikeEntity } from 'src/share/entity/hike.entity';

@Injectable()
export class SosService {
  constructor(
    @InjectRepository(EventEntity, 'mobile')
    private readonly repo: Repository<EventEntity>
  ) { }

  async create(sos: EventDto): Promise<HikooResponse> {
    try {
      const exist = await getConnection()
        .createQueryBuilder()
        .select('hike.id')
        .from(HikeEntity, 'hike')
        .where("hiker_id=:id", { id: sos.reporterId })
        .andWhere('hike_started=1')
        .andWhere('hike_finished=0')
        .orderBy('hike_start', 'DESC')
        .getRawOne();

      if (!exist) {
        return new HikooResponse(false, 'User doesnt have active hiking permit');
      }

      sos.hikeId = exist.hike_id;
      await this.repo.save(sos.toEntity());
    } catch (e) {
      return new HikooResponse(false, e.message);
    }

    return { success: true }
  }
}
