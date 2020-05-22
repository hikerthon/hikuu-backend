import { Injectable } from '@nestjs/common';

@Injectable()
export class AlertlevelService {
    getAlertLevels() {
        return [
            {id: 1, name:'Information', ttl:6, radius:5},
            {id: 2, name:'Caution', ttl:12, radius:7},
            {id: 3, name:'Danger', ttl:24, radius:10},
            {id: 4, name:'Emergency', ttl:48, radius:-1}
        ]
    }
}
