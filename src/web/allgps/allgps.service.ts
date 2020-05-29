import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { AllGpsEntity } from '../../share/entity/allgps.entity';
import { AllGPSDto } from '../../share/dto/allgps.dto';
import { subDays } from "date-fns";
import { formatDate } from '../../share/utils/utils';

@Injectable()
export class AllgpsService {
  constructor(
    @InjectRepository(AllGpsEntity)
    private readonly repo: Repository<AllGpsEntity>,
  ) {
  }

  async getAll(): Promise<AllGPSDto[]> {
    const startTime = new Date(formatDate(new Date(Date.now())))
    const betweenDate = Between(subDays(startTime, 3), startTime);
    const gpsData = await this.repo.find({
      where: {
        logtime: betweenDate,
      }
    });
    return gpsData.map(gps => AllGPSDto.fromEntity(gps));
  }
}
