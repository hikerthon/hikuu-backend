import { Injectable } from '@nestjs/common';
import { Shelter } from '../../share/models/shelter.model';

@Injectable()
export class ShelterService {
  shelters: Array<Shelter> = [
    {
      id: 1,
      name: 'Shelter A',
      lat: 23.468818,
      lng: 120.954489
    },
    {
      id: 2,
      name: 'Shelter B',
      lat: 23.558818,
      lng: 120.754489
    }
  ];

  getNearbyShelters(userId: Number) {
    return this.shelters;
  }
}
