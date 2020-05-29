import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventDto, EventViewDto, ModifyEventDto } from '../../share/dto/event.dto';
import { EventEntity } from '../../share/entity/event.entity';
import { HikooResponse, CountResponseDto } from '../../share/dto/generic.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly repo: Repository<EventEntity>,
  ) {
  }

  async getAll(): Promise<EventDto[]> {
    const events = await this.repo.find();
    return events.map(alert => EventDto.fromEntity(alert));
  }

  async getById(id: number): Promise<EventDto> {
    const one = await this.repo.findOne({ where: { id: id } });
    return EventDto.fromEntity(one);
  }

  async getAllView(start: number, count: number): Promise<EventViewDto[]> {
    const events = await this.repo.find({
      relations: ['eventType', 'alertLevel', 'hike', 'reporter', 'attachments'],
      order: { logtime: 'DESC' },
      take: count,
      skip: start,
    });

    return events.map(event => EventViewDto.fromEntity(event));
  }

  async getCount(): Promise<CountResponseDto> {
    try {
      const count = await this.repo.count();
      return {
        success: true,
        count: count,
        errorMessage: null,
      };
    } catch (e) {
      return {
        success: false,
        count: 0,
        errorMessage: e.message,
      };
    }
  }

  async getViewById(id: number): Promise<EventViewDto | null> {
    const event = await this.repo.findOne({
      relations: ['eventType', 'alertLevel', 'hike', 'reporter', 'attachments'],
      order: { logtime: 'DESC' },
      where: { id: id },
    });

    if (!event) {
      return null;
    }
    return EventViewDto.fromEntity(event);
  }

  async create(event: EventDto): Promise<HikooResponse> {
    await this.repo.save(event.toEntity());
    return { success: true };
  }


  async modify(event: ModifyEventDto[]): Promise<HikooResponse> {
    for (const element of event) {
      await this.repo.update(
        element.id,
        {
          stat: element.stat,
          alertLevelId: element.alertId,
        },
      );
    }
    return {
      success: true,
      errorMessage: null,
    };
  }
}