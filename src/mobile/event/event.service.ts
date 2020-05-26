import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/share/entity/event.entity';
import { Repository } from 'typeorm';
import { EventViewDto, EventDto } from 'src/share/dto/event.dto';
import { HikooResponse } from 'src/share/dto/generic.dto';

@Injectable()
export class EventService {

  constructor(
    @InjectRepository(EventEntity, 'mobile')
    private readonly repo: Repository<EventEntity>
  ) { }

  async getByHikeId(hikeId: number, start: number, count: number): Promise<EventViewDto[]> {
    const events = await this.repo.find({
      relations: ['eventType', 'alertLevel', 'hike', 'reporter'],
      where: { hikeId: hikeId },
      order: { logtime: 'DESC' },
      skip: start,
      take: count

    });

    return events.map(alert => EventViewDto.fromEntity(alert));
  }

  async create(event: EventDto): Promise<HikooResponse> {
    try {
      await this.repo.save(event)
    } catch (e) {
      return { success: false, errorMessage: e.message };
    }

    return { success: true }
  }

}
