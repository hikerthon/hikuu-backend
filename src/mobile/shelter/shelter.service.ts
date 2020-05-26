import { Injectable } from '@nestjs/common';
import { ShelterAroundMeDto } from 'src/share/dto/shelter.dto';
import { Location } from '../../share/models/location.model';
import { AccountEntity } from 'src/share/entity/account.entity';
import { getConnection, getManager } from 'typeorm';

@Injectable()
export class ShelterService {

  async getNearbyShelters(loc: Location): Promise<ShelterAroundMeDto[]> {
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
      .query(`SELECT id, shelter_name, capacity, latpt, lngpt, 
      ST_Distance_Sphere(POINT(lngpt, latpt), POINT(?, ?)) distance_mtr 
      FROM shelters ORDER BY distance_mtr ASC LIMIT 0, 5;`, [loc.lng, loc.lat])
      .then( rows => rows.map( row => ShelterAroundMeDto.convert(row)));
  }
}