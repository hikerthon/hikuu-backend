import { Injectable } from '@nestjs/common';
import { SOS } from '../../events/share/models/sos.model';

@Injectable()
export class SosService {
  callSOS(sos: SOS) {
    // TODO
    return true;
  }
}
