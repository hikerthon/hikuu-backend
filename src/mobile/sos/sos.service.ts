import { Injectable } from '@nestjs/common';
import { Location } from '../../share/models/location.model';

@Injectable()
export class SosService {
  callSOS(location: Location) {
    // tranfer loaction to SOS event format
    // create sos event
    return true;
  }
}
