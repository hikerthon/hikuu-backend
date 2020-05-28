import { Injectable } from '@nestjs/common';
import { AlertLevelDto } from 'src/share/dto/alertlevel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AlertlevelEntity } from 'src/share/entity/alertlevel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlertlevelService {
  constructor(
    @InjectRepository(AlertlevelEntity) private readonly repo: Repository<AlertlevelEntity>,
  ) {
  }

  getFakeData() {
    return [
      { id: 1, name: 'Information', ttl: 6, radius: 5 },
      { id: 2, name: 'Caution', ttl: 12, radius: 7 },
      { id: 3, name: 'Danger', ttl: 24, radius: 10 },
      { id: 4, name: 'Emergency', ttl: 48, radius: -1 },
    ];
  }

  async getAll(): Promise<AlertLevelDto[]> {
    const alevels = await this.repo.find();
    return alevels.map(al => AlertLevelDto.fromEntity(al));
  }
}
