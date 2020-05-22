import { Injectable } from '@nestjs/common';
import { PermitView } from '../../share/models/permit.model'


@Injectable()
export class PermitService {

  permits: Array<PermitView> = [
    // {
    //   permitId: 1,
    //   permitName: 'Yushan National Park Permit',
    //   trailList: [
    //     { trailId: 1, trailName: 'Yushan trails', permitId: 1 }
    //   ]
    // },
    // {
    //   permitId: 2,
    //   permitName: 'Taroko National Park Permit',
    //   trailList: [
    //     { trailId: 2, trailName: 'Qilai trails', permitId: 2 },
    //     { trailId: 3, trailName: 'Zhuilu trails', permitId: 2 },
    //     { trailId: 4, trailName: 'Nanhu trails', permitId: 2 },
    //   ]
    // },
    // {
    //   permitId: 3,
    //   permitName: 'Shei-Pa National Park Permit',
    //   trailList: [
    //     { trailId: 5, trailName: 'Xuejian trails', permitId: 3 },
    //     { trailId: 6, trailName: 'Daba trails', permitId: 3 }
    //   ]
    // }
  ];

  getPermits(userId: string) {
    return this.getPermits;
  }






}
