import { Injectable } from '@nestjs/common';
import {
    DataTypeRole,
    PermitView,
    TrailView } from '../../share/models/permit.model';

@Injectable()
export class PermitService {
    getFakePermits(dataTypeRole ?: DataTypeRole, permits ?: Number, hikers ?: Number) {
        return [
            new PermitView(1, 'Yushan National Park Permit', [
                new TrailView(1, 'Yushan trails', 1)
            ]),
            new PermitView(2, 'Taroko National Park Permit', [
                new TrailView(2, 'Qilai trails', 2),
                new TrailView(3, 'Zhuilu trails', 2),
                new TrailView(4, 'Nanhu trails', 2)
            ]),
            new PermitView(3, 'Shei-Pa National Park Permit', [
                new TrailView(5, 'Xuejian trails', 3),
                new TrailView(6, 'Daba trails', 3)
            ])
        ]
    }

    getFakePermit() {
        return new PermitView(1, 'Yushan National Park Permit', [
            new TrailView(1, 'Yushan trails', 1)
        ])
    }
}
