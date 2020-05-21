import { Injectable } from '@nestjs/common';
import { SOS } from './sos'

@Injectable()
export class SosService {
  callSOS(sos: SOS) {
    console.log(sos);
    // TODO
  }
}
