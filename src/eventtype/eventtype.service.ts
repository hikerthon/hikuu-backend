import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventtypeEntity } from './entity/eventtype.entity';
import { EventTypeDto } from './dto/eventtype.dto';

@Injectable()
export class EventtypeService {
    constructor(
      @InjectRepository(EventtypeEntity)
      private readonly etRepo: Repository<EventtypeEntity>,
    ) {}

    getFakeEventTypes() {
        return [
            {id:1, name:'Animal', description:'Wild/stray animal spotted nearby the trail', defAlert:1},
            {id:2, name:'Item Found', description:'Item dropped on trail', defAlert:1},
            {id:3, name:'Blocked Route', description:'Anything that blocking the trail route', defAlert:2},
            {id:4, name:'SOS', description:'SOS', defAlert:4}
        ]
    }

    async getAllEventTypes(): Promise<EventTypeDto[]> {
        const ets = await this.etRepo.find();
        return ets.map( et => EventTypeDto.fromEntity(et) );
    }
}
