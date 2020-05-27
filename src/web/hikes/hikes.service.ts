import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HikeEntity } from '../../share/entity/hike.entity';
import { HikeViewDto, HikeViewModifyDto } from '../../share/dto/hike.dto';
import { CountResponseDto } from '../../share/dto/generic.dto'
import { HikooResponse } from '../../share/dto/generic.dto';

@Injectable()
export class HikesService {

  constructor(
    @InjectRepository(HikeEntity)
    private readonly repo: Repository<HikeEntity>
  ) { }

  async getAllHikes(startIndex: number, count: number): Promise<HikeViewDto[]> {
    const hikes = await this.repo.find({
      relations: ['hiker', 'permit', 'trails'],
      order: {logtime: 'DESC'},
      take: count,
      skip: startIndex,
    })

    return hikes.map(hike => HikeViewDto.fromEntity(hike))
  }

  async getAllHikesCount(): Promise<CountResponseDto> {
    try {
      const hikesCount = await this.repo.count()
      return {
        success: true,
        count: hikesCount,
        errorMessage: null
      }
    } catch(e) {
      return {
        success: false,
        count: 0,
        errorMessage: e.message
      }
    }
  }

  async getHikes(id: number): Promise<HikeViewDto> {
    const hikes = await this.repo.findOne({
      relations: ['hiker', 'permit', 'trails'],
      order: {logtime: 'DESC'},
      where: {id}
    })

    return HikeViewDto.fromEntity(hikes)
  }


  async modifyHikes(data: HikeViewModifyDto): Promise<HikooResponse> {
    try {
      await this.repo.update(
        data.hikeId,
        {
          memo: data.memo
        }
      )
  
      return {
        success: true,
        errorMessage: null
      }
    } catch (e) {
      return {
        success: false,
        errorMessage: e.errorMessage
      }
    } 
  }
}
