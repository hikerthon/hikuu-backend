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
    ) {}

    getFakeData() {
        return [
            {id:1, name:'Animal', description:'Wild/stray animal spotted nearby the trail', defaultAlert:1},
            {id:2, name:'Item Found', description:'Item dropped on trail', defaultAlert:1},
            {id:3, name:'Blocked Route', description:'Anything that blocking the trail route', defaultAlert:2},
            {id:4, name:'SOS', description:'SOS', defaultAlert:4}
        ]
    }

    async getAll(): Promise<EventTypeDto[]> {
        const ets = await this.repo.find({
            relations: ['defaultAlert']
        });
        return ets.map( et => EventTypeDto.fromEntity(et) );
    }
}
