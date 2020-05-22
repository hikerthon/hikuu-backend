import { Injectable } from '@nestjs/common';

@Injectable()
export class AllgpsService {
    getAllGPS() {
        return [{
            location: '23.468858, 120.954451',
            pointType: 'hiker',
            eventId: 0,
            alertId: 0,
            timestamp: 1589894000
        }, {
            location: '23.468878, 120.954459',
            pointType: 'hiker',
            eventId: 0,
            alertId: 0,
            timestamp: 1589894000
        }, {
            location: '23.469311, 120.955127',
            pointType: 'event',
            eventId: 1,
            alertId: 1,
            timestamp: 1589895049
        }]
    }
}
