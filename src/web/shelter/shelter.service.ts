import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShelterEntity } from '../../share/entity/shelter.entity';
import { ShelterDto } from '../../share/dto/shelter.dto';

@Injectable()
export class ShelterService {
  constructor(
    @InjectRepository(ShelterEntity)
    private readonly repo: Repository<ShelterEntity>,
  ) {
  }

  async getAll(): Promise<ShelterDto[]> {
    const permits = await this.repo.find();
    return permits.map(permit => ShelterDto.fromEntity(permit));
  }

  async getById(id: number): Promise<ShelterDto | null> {
    const one = await this.repo.findOne({ where: { id: id } });
    if (!one) {
      return null;
    }
    return ShelterDto.fromEntity(one);
  }
}
