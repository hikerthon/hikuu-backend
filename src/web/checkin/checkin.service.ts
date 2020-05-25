import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CheckinEntity } from '../../share/entity/checkin.entity';
import { CheckinDto, CheckinTimeByTodayDto } from '../../share/dto/checkin.dto';

@Injectable()
export class CheckinService {
  constructor(
    @InjectRepository(CheckinEntity)
    private readonly repo: Repository<CheckinEntity>
  ) { }


  async getCheckinRecordById(hikerId: number): Promise<CheckinDto[]> {

    const records = await this.repo.find({
      relations: ['hiker', 'hike'],
      where: {hikerId}
    })

    return records.map(record => CheckinDto.fromEntity(record))
  }

  async getTodayCheckinTime(): Promise<CheckinTimeByTodayDto[]> {
    const records = await this.repo.createQueryBuilder("checkin")
      .select('count(*), hour(checkin_time)')
      .groupBy('hour(checkin_time)')
      .getRawMany()
    return records.map(record => CheckinTimeByTodayDto.fromEntity(record))
  }
}
