import { Injectable } from '@nestjs/common';
import { Alert } from './alert';

@Injectable()
export class AlertService {
  alerts: Array<Alert> = [{ title: 'aa', description: 'des1', sender: "x", date: '2020/05/14' }, { title: 'aa', description: 'des1', sender: "x", date: '2020/05/14' }];

  getAlerts() {
    return this.alerts;
  }

}
