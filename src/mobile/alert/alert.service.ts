import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlertEntity } from '../../share/entity/alert.entity';
import { AlertViewDto } from '../../share/dto/alert.dto';

@Injectable()
export class AlertService {

  constructor(
    @InjectRepository(AlertEntity, 'mobile')
    private readonly repo: Repository<AlertEntity>,
  ) {
  }

  async getAllView(): Promise<AlertViewDto[]> {
    const alerts = await this.repo.find({
      relations: ['eventType', 'alertLevel', 'permit', 'creator', 'originSource'],
      order: { id: 'ASC' },
    });

    return alerts.map(alert => AlertViewDto.fromEntity(alert));
  }

}
