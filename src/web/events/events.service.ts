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

  getFakeData() {
    return [{
      hikeId: 1,
      hikerId: 1,
      reporter: 'Xu, Yu-Chen',
      lat: 24.937596,
      long: 121.021746,
      radius: 5,
      alertId: 1,
      alertLevel: '1',
      eventId: 1,
      eventType: 'Falling rocks',
      eventInfo: 'eventInfo',
      eventTime: '11/10/2016, 11:49:36 AM',
      ttl: 1,
      status: 'PENDING',
    }, {
      hikeId: 2,
      hikerId: 2,
      reporter: 'Xu, Yu-Chen',
      lat: 24.937596,
      long: 121.021746,
      radius: 5,
      alertId: 1,
      alertLevel: '1',
      eventId: 1,
      eventType: 'Falling rocks',
      eventInfo: 'eventInfo',
      eventTime: '11/10/2016, 11:49:36 AM',
      ttl: 1,
      status: 'PENDING',
    }];
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

  async getViewById(id: number): Promise<EventViewDto> {
    const event = await this.repo.findOne({
      relations: ['eventType', 'alertLevel', 'hike', 'reporter', 'attachments'],
      order: { logtime: 'DESC' },
      where: { id: id },
    });

    return EventViewDto.fromEntity(event);
  }

  async create(event: EventDto): Promise<HikooResponse> {
    try {
      await this.repo.save(event.toEntity());
    } catch (e) {
      return { success: false, errorMessage: e.message };
    }

    return { success: true };
  }


  async modify(event: ModifyEventDto[]): Promise<HikooResponse> {
    try {
      event.forEach(async (element) => {
        await this.repo.update(
          element.id,
          {
            stat: element.stat,
            alertLevelId: element.alertId,
          },
        );
      });
      return {
        success: true,
        errorMessage: null,
      };
    } catch (e) {
      return {
        success: false,
        errorMessage: e.errorMessage,
      };
    }
  }
}

// async modifyHikes(data: HikeViewModifyDto): Promise<HikooResponse> {
//     try {
//       await this.repo.update(
//         data.hikeId,
//         {
//           memo: data.memo
//         }
//       )

//       return {
//         success: true,
//         errorMessage: null
//       }
//     } catch (e) {
//       return {
//         success: false,
//         errorMessage: e.errorMessage
//       }
//     } 
//   }
// }


// async create(alert: AlertDto): Promise<HikooResponse> {
//     try {

//         // save alert
//         const saveThis = Object.assign(new AlertDto(), alert);
//         const newAlert = await this.repo.save(saveThis.toEntity());

//         // save attachments
//         alert.attachments.forEach(function (attachment) {
//             const atc = new AlertAttachmentEntity();
//             atc.alert = newAlert;
//             atc.imagePath = attachment;
//             getConnection().getRepository(AlertAttachmentEntity).save(atc);
//         });

//     } catch (e) {
//         return { success: false, errorMessage: e.message };
//     }

//     return { success: true }
// }

// // createFromEvent --> need to update Events stat into RESOLVED
// }