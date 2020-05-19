import { Injectable } from '@nestjs/common';

@Injectable()
export class AllgpsService {
    getAllGPS() {
        return [{
            location: '23.468858, 120.954451',
            point_type: 'hiker',
            event_id: 0,
            alert_id: 0,
            timestamp: 1589894000
        }, {
            location: '23.468878, 120.954459',
            point_type: 'hiker',
            event_id: 0,
            alert_id: 0,
            timestamp: 1589894000
        }, {
            location: '23.469311, 120.955127',
            point_type: 'event',
            event_id: 1,
            alert_id: 1,
            timestamp: 1589895049
        }]
    }
}
