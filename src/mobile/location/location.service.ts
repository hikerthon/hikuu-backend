import { Injectable } from '@nestjs/common';
import { Location } from '../../models/location.model';

@Injectable()
export class LocationService {
  location: Location = { userId: 1, lat: "123", long: "456" };

  getLocation() {
    return this.location;
  }

}
