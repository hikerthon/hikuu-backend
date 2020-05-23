import { Injectable } from '@nestjs/common';

@Injectable()
export class AlertsService {

    getFakeAlerts() {
        return null;
    }

    getFakeAlertById(id) {
        return {
            permitId: 1,
            permitName: 'Yushan National Park Permit',
            lat: 23.468818,
            lng: 120.954489,
            radius: 3,
            alertLevelId: 2,
            alertLevel: 'Caution',
            eventTypeId: 1,
            eventType: 'Animal',
            eventInfo: 'Water Buffalloo nearby',
            eventTIme: '2020-05-19 17:00',
            ttl: 6,
            stationId: 1,
            stationName: 'Yushan'
        }
    }


    getFakeAllAlertCount() {
        return 10;
    }
}
