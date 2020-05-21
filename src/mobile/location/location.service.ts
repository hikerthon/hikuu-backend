import { Injectable } from '@nestjs/common';
import { Location } from './location';

@Injectable()
export class LocationService {
  location: Location = { lat: "123", long: "456" };

  getLocation() {
    return this.location;
  }

}
