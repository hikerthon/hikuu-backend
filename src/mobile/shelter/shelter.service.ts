import { Injectable } from '@nestjs/common';
import { Shelter } from '../../share/models/shelter.model';

@Injectable()
export class ShelterService {
  shelters: Array<Shelter> = [
    {
      id: 1,
      name: 'Shelter A',
      location: '23.468818, 120.954489',

    },
    {
      id: 2,
      name: 'Shelter B',
      location: '23.558818, 120.754489',

    }
  ];

  getNearbyShelters(userId: string) {
    return this.shelters;
  }
}
