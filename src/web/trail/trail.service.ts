import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TrailEntity } from '../../share/entity/trail.entity';
import { TrailDto } from '../../share/dto/trail.dto';

@Injectable()
export class TrailService {
  constructor(
    @InjectRepository(TrailEntity)
    private readonly repo: Repository<TrailEntity>,
  ) {
  }

  async getAll(): Promise<TrailDto[]> {
    const permits = await this.repo.find();
    return permits.map(permit => TrailDto.fromEntity(permit));
  }

  async getById(id: number): Promise<TrailDto | null> {
    const one = await this.repo.findOne({ where: { id: id } });
    if (!one) {
      return null;
    }
    return TrailDto.fromEntity(one);
  }
}
