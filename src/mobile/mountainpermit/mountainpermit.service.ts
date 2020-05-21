import { Injectable } from '@nestjs/common';
import { MountainPermit } from './mountainpermit';

@Injectable()
export class MountainpermitService {
  mountainPermits: Array<MountainPermit> = [{ mountainName: 'm1', date: '2020/05/10', status: 'expired' }, { mountainName: 'm2', date: '2020/05/16', status: 'activated' }]

  getMountainPermits() {
    return this.mountainPermits;
  }
}
