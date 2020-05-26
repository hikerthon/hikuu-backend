import { Injectable } from '@nestjs/common';
import { getManager, getConnection } from 'typeorm';
import { Location } from '../../share/models/location.model';
import { AroundMeDto } from 'src/share/dto/aroundme.dto';
import { AccountEntity } from 'src/share/entity/account.entity';

@Injectable()
export class AroundMeService {

  async getAroundMe(loc: Location): Promise<AroundMeDto[]> {
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
      .query('CALL GetEventAroundMe(?, ?)', [loc.lat, loc.lng])
      .then( rows => rows[0].map( row => AroundMeDto.fromEntity(row)));
  }
}
