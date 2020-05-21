import { Injectable } from '@nestjs/common';
import { Location } from '../../models/location.model';

@Injectable()
export class LocationService {

  sendLocation(location: Location) {
    // Send hiker location
    return true;
  }
}
