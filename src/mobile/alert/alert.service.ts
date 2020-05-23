import { Injectable } from '@nestjs/common';
import { Alerts } from '../../share/models/alert.model';

@Injectable()
export class AlertService {
  alerts: Array<Alerts> = [
    {
      permitId: 1,
      permitName: "Yushan National Park Permit",
      lat: 23.468818,
      lng: 120.954489,
      radius: 3,
      alertLevelId: 2,
      alertLevel: 'Caution',
      eventTypeId: 1,
      eventType: 'Animal',
      eventInfo: 'Water Buffalloo nearby',
      eventTime: '2020-05-19 17:00',
      ttl: 6,
      stationId: 1,
      stationName: 'Taroko',
    },
    {
      permitId: 2,
      permitName: 'Taroko National Park Permit',
      lat: 23.468818,
      lng: 120.954489,
      radius: 5,
      alertLevelId: 3,
      alertLevel: 'Danger',
      eventTypeId: 1,
      eventType: 'Animal',
      eventInfo: 'Cobra spotted nearby',
      eventTime: '2020-05-19 17:00',
      ttl: 6,
      stationId: 1,
      stationName: 'Taroko'
    },
  ];

  getAlerts() {
    return this.alerts;
  }

}
