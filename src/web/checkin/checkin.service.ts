import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CheckinEntity } from '../../share/entity/checkin.entity';
import { CheckinCreateDto, CheckinDto } from '../../share/dto/checkin.dto';
import { HikooResponse } from '../../share/dto/generic.dto';

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

  async create(checkin: CheckinCreateDto): Promise<HikooResponse> {
    try {
      await this.repo.save(checkin);
      return {success: true, errorMessage: null}
    } catch (e) {
      return { success: false, errorMessage: e.message };
    }
  }
}
