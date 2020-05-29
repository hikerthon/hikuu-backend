import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StationEntity } from '../../share/entity/station.entity';
import { StationDto } from '../../share/dto/station.dto';

@Injectable()
export class StationService {
  constructor(
    @InjectRepository(StationEntity)
    private readonly repo: Repository<StationEntity>,
  ) {
  }

  async getAll(): Promise<StationDto[]> {
    const permits = await this.repo.find();
    return permits.map(permit => StationDto.fromEntity(permit));
  }

  async getById(id: number): Promise<StationDto | null> {
    const one = await this.repo.findOne({ where: { id: id } });
    if (!one) {
      return null;
    }
    return StationDto.fromEntity(one);
  }
}
