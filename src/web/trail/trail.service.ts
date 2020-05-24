import { Injectable } from '@nestjs/common';
import { TrailEntity } from 'src/share/entity/trail.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrailDto } from 'src/share/dto/trail.dto';

@Injectable()
export class TrailService {
    constructor(
      @InjectRepository(TrailEntity)
      private readonly repo: Repository<TrailEntity>,
    ) {}

    getFakeData(){
        return []
    }

    async getAll(): Promise<TrailDto[]> {
        const permits = await this.repo.find();
        return permits.map( permit => TrailDto.fromEntity(permit) );
    }

    async getById(id: number): Promise<TrailDto> {
        const one = await this.repo.findOne({where: {id: id}});
        return TrailDto.fromEntity(one);
    }
}
