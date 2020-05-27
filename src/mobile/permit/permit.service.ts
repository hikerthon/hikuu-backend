import { Injectable } from '@nestjs/common';
import { HikeViewDto } from 'src/share/dto/hike.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HikeEntity } from 'src/share/entity/hike.entity';
import { Repository } from 'typeorm';


@Injectable()
export class PermitService {

  constructor(
    @InjectRepository(HikeEntity, 'mobile')
    private readonly repo: Repository<HikeEntity>
  ) { }

  async getById(id: number): Promise<HikeViewDto> {
    const hike = await this.repo.findOne({
      relations: ['hiker', 'permit', 'trails'],
      where: { id: id }
    })

    return HikeViewDto.fromEntity(hike)
  }

  async getByHikerId(hikerId: number, start: number, count: number): Promise<HikeViewDto[]> {
    const hikes = await this.repo.find({
      relations: ['hiker', 'permit', 'trails'],
      where: { hiker: hikerId },
      order: { logtime: 'DESC' },
      skip: start,
      take: count,
    })

    return hikes.map(hike => HikeViewDto.fromEntity(hike));
  }

  async FindOneByIds(hikerId: number, hikeId: number): Promise<HikeViewDto> {
    const hike = await this.repo.findOne({
      relations: ['hiker', 'permit', 'trails'],
      where: { hikerId: hikerId, id: hikeId },
      order: { logtime: 'DESC' },
    });
    
    if ( !hike ) {
      return null;
    }

    return HikeViewDto.fromEntity(hike);
  }

}
