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

  async getAll(): Promise<AlertLevelDto[]> {
    const alevels = await this.repo.find();
    return alevels.map(al => AlertLevelDto.fromEntity(al));
  }
}
