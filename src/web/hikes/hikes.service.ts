import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { HikeEntity } from '../../share/entity/hike.entity';
import { HikeDto, HikeModifyDto, HikeViewDto, HikeViewModifyDto } from '../../share/dto/hike.dto';
import { CountResponseDto } from '../../share/dto/generic.dto';
import { HikooResponse } from '../../share/dto/generic.dto';
import { AccountEntity } from '../../share/entity/account.entity';
import { AlertDto } from '../../share/dto/alert.dto';

@Injectable()
export class HikesService {

  constructor(
    @InjectRepository(HikeEntity)
    private readonly repo: Repository<HikeEntity>,
    @InjectRepository(AccountEntity)
    private readonly repoAccount: Repository<AccountEntity>,
  ) {
  }

  async getAllHikes(startIndex: number, count: number): Promise<HikeViewDto[]> {
    const hikes = await this.repo.find({
      relations: ['hiker', 'permit', 'trails'],
      order: { logtime: 'DESC' },
      take: count,
      skip: startIndex,
    });

    return hikes.map(hike => HikeViewDto.fromEntity(hike));
  }

  async getAllHikesCount(): Promise<CountResponseDto> {
    const hikesCount = await this.repo.count();
    return {
      success: true,
      count: hikesCount,
      errorMessage: null,
    };
  }

  async getHikes(id: number): Promise<HikeViewDto | null> {
    const hikes = await this.repo.findOne({
      relations: ['hiker', 'permit', 'trails'],
      order: { logtime: 'DESC' },
      where: { id },
    });
    if (!hikes) {
      return null;
    }
    return HikeViewDto.fromEntity(hikes);
  }

  async getHikeByHikerId(hikerId: number): Promise<HikeViewDto | null> {
    const hikes = await this.repo.findOne({
      relations: ['hiker', 'permit', 'trails'],
      order: { logtime: 'DESC' },
      where: { hikerId },
    });
    if (!hikes) {
      return null;
    }
    return HikeViewDto.fromEntity(hikes);
  }


  async modifyHikes(data: HikeViewModifyDto[]): Promise<HikooResponse> {
    for (const element of data) {
      if (element.memo) {
        await this.repo.update(
          element.hikeId,
          {
            memo: element.memo,
          },
        );
      }
      if (element.watchStatus) {
        console.log(element.watchStatus);
        await this.repoAccount.update(
          element.hikerId,
          {
            watchStatus: element.watchStatus,
          },
        );
      }
    }
    return {
      success: true,
      errorMessage: null,
    };
  }

  async insertHikes(hikeData: HikeDto): Promise<HikooResponse> {
    const saveThis = Object.assign(new HikeDto(), hikeData);
    await this.repo.save(saveThis.toEntity());
    return {
      success: true,
      errorMessage: null,
    };
  }

  async modifyHikePermitStatus(dto: HikeModifyDto): Promise<HikooResponse> {
    await getConnection()
      .createQueryBuilder()
      .update(HikeEntity)
      .set({ acceptedTime: new Date(dto.acceptTime), permitAccepted: dto.permitAccepted })
      .where("id = :id", { id: dto.hikeId })
      .execute();
    return { success: true, errorMessage: null }
  }
}


