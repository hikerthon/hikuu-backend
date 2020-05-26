import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HikooResponse } from 'src/share/dto/generic.dto';
import { CheckinEntity } from 'src/share/entity/checkin.entity';
import { CheckinDto } from 'src/share/dto/checkin.dto';

@Injectable()
export class CheckInService {

  constructor(
    @InjectRepository(CheckinEntity, 'mobile')
    private readonly repo: Repository<CheckinEntity>
  ) { }

  async sendCheckIn(track: CheckinDto): Promise<HikooResponse> {
    try {
      const saveThis = Object.assign(new CheckinDto(), track);
      saveThis.checkinTime = null;
      await this.repo.save(saveThis.toEntity());
    } catch (e) {
      return new HikooResponse(false, e.message);
    }

    return new HikooResponse(true, null);
  }
}
