import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StationEntity } from 'src/share/entity/station.entity';
import { StationDto } from 'src/share/dto/station.dto';

@Injectable()
export class StationService {
    constructor(
      @InjectRepository(StationEntity)
      private readonly repo: Repository<StationEntity>,
    ) {}

    getFakeData(){
        return []
    }

    async getAll(): Promise<StationDto[]> {
        const permits = await this.repo.find();
        return permits.map( permit => StationDto.fromEntity(permit) );
    }

    async getById(id: number): Promise<StationDto> {
        const one = await this.repo.findOne({where: {id: id}});
        return StationDto.fromEntity(one);
    }
}
