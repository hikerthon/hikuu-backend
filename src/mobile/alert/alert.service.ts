import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlertEntity } from '../../share/entity/alert.entity';
import { AlertDto } from '../../share/dto/alert.dto';

@Injectable()
export class AlertService {

  constructor(
    @InjectRepository(AlertEntity, 'mobile')
    private readonly repo: Repository<AlertEntity>
  ) { }

  async getAll(): Promise<AlertDto[]> {
    const alerts = await this.repo.find();
    return alerts.map(alert => AlertDto.fromEntity(alert));
  }

}
