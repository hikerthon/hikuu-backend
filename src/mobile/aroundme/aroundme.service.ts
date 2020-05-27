import { Injectable } from '@nestjs/common';
import { getManager, getConnection } from 'typeorm';
import { AroundMeDto } from '../../share/dto/aroundme.dto';
import { UserLocationDto } from '../../share/dto/location.dto';
import { AccountEntity } from '../../share/entity/account.entity';

@Injectable()
export class AroundMeService {

  async getAroundMe(loc: UserLocationDto): Promise<AroundMeDto[]> {
    const user = await getConnection()
      .createQueryBuilder()
      .select('user.id')
      .from(AccountEntity, 'user')
      .where("id=:id", { id: loc.userId })
      .getRawOne();

    if (!user) {
      return [];
    }

    return await getManager()
      .query('CALL GetEventAroundMe(?, ?)', [loc.latpt, loc.lngpt])
      .then(rows => rows[0].map(row => AroundMeDto.fromEntity(row)));
  }
}
