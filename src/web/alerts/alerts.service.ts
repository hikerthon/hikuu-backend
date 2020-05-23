import { Injectable } from '@nestjs/common';
import { Alerts } from '../../share/models/alert.model'

@Injectable()
export class AlertsService {
    alerts: Alerts[] = [
        new Alerts(1, 'Yushan National Park Permit', 23.468818, 120.954489, 3, 2, 'Caution', 1, 'Animal', 'Water Buffalloo nearby', '2020-05-19 17:00', 6, 1, 'Yushan'),
        new Alerts(2, 'Taroko National Park Permit', 24.174251, 121.565319, 5, 3, 'Danger', 1, 'Animal', 'Cobra spotted nearby', '2020-05-19 17:00', 6, 1, 'Taroko')
    ]

    getFakeAlerts() {
        return this.alerts
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
