import { Injectable } from '@nestjs/common';
import { TrailView } from '../models/permit.model';

@Injectable()
export class TrailsService {
    getFakeTrails(){
        return [
            new TrailView(1, 'Yushan trails', 1),
            new TrailView(2, 'Qilai trails', 2),
            new TrailView(3, 'Zhuilu trails', 2),
            new TrailView(4, 'Nanhu trails', 2),
            new TrailView(5, 'Xuejian trails', 3),
            new TrailView(6, 'Daba trails', 3)
        ]
    }
}
