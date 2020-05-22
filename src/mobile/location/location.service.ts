import { Injectable } from '@nestjs/common';
import { Location } from '../../share//models/location.model';

@Injectable()
export class LocationService {

  sendLocation(location: Location) {
    // Send hiker location
    return true;
  }
}
