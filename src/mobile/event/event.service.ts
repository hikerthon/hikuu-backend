import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { EventEntity, EventAttachmentEntity } from '../../share/entity/event.entity';
import { EventViewDto, EventDto } from '../../share/dto/event.dto';
import { HikooResponse } from '../../share/dto/generic.dto';

@Injectable()
export class EventService {

  constructor(
    @InjectRepository(EventEntity, 'mobile')
    private readonly repo: Repository<EventEntity>,
  ) {
  }

  async getByHikeId(hikeId: number, start: number, count: number): Promise<EventViewDto[]> {
    const events = await this.repo.find({
      relations: ['eventType', 'alertLevel', 'hike', 'reporter'],
      where: { hikeId: hikeId },
      order: { logtime: 'DESC' },
      skip: start,
      take: count,

    });

    return events.map(alert => EventViewDto.fromEntity(alert));
  }

  async create(event: EventDto): Promise<HikooResponse> {
    try {
      // save event
      const saveEvent = Object.assign(new EventDto(), event);
      const newEvent = await this.repo.save(saveEvent.toEntity());

      // save attachments
      event.attachments.forEach(
        function(attachment) {
          const atc = new EventAttachmentEntity();
          atc.event = newEvent;
          atc.imagePath = attachment;
          getConnection('mobile').getRepository(EventAttachmentEntity).save(atc);
        },
      );
    } catch (e) {
      return { success: false, errorMessage: e.message };
    }

    return { success: true };
  }

}
