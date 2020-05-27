import { Injectable } from '@nestjs/common';
import { getConnection, getManager } from 'typeorm';
import { ShelterAroundMeDto } from '../../share/dto/shelter.dto';
import { UserLocationDto } from '../../share/dto/location.dto';
import { AccountEntity } from '../../share/entity/account.entity';

@Injectable()
export class ShelterService {

  async getNearbyShelters(loc: UserLocationDto): Promise<ShelterAroundMeDto[]> {
    const user = await getConnection()
      .createQueryBuilder()
      .select('user.id')
      .from(AccountEntity, 'user')
      .where('id=:id', { id: loc.userId })
      .getRawOne();

    if (!user) {
      return [];
    }

    return await getManager()
      .query(`SELECT id, shelter_name, capacity, latpt, lngpt, 
      ST_Distance_Sphere(POINT(lngpt, latpt), POINT(?, ?)) distance_mtr 
      FROM shelters ORDER BY distance_mtr ASC LIMIT 0, 5;`, [loc.lngpt, loc.latpt])
      .then(rows => rows.map(row => ShelterAroundMeDto.convert(row)));
  }
}