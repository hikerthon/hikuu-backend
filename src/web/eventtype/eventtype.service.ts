import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventtypeEntity } from '../../share/entity/eventtype.entity';
import { EventTypeDto } from '../../share/dto/eventtype.dto';

@Injectable()
export class EventtypeService {
  constructor(
    @InjectRepository(EventtypeEntity)
    private readonly repo: Repository<EventtypeEntity>,
  ) {
  }

  async getAll(): Promise<EventTypeDto[]> {
    const ets = await this.repo.find({
      relations: ['defaultAlert'],
    });
    return ets.map(et => EventTypeDto.fromEntity(et));
  }
}
