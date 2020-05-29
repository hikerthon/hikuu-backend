import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PermitDto } from '../../share/dto/permit.dto';
import { PermitEntity } from '../../share/entity/permit.entity';

@Injectable()
export class PermitService {
  constructor(
    @InjectRepository(PermitEntity)
    private readonly repo: Repository<PermitEntity>,
  ) {
  }

  async getAll(): Promise<PermitDto[]> {
    const permits = await this.repo.find();
    return permits.map(permit => PermitDto.fromEntity(permit));
  }

  async getById(id: number): Promise<PermitDto | null> {
    const one = await this.repo.findOne({ where: { id: id } });
    if (!one) {
      return null;
    }
    return PermitDto.fromEntity(one);
  }
}
