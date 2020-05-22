import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
    getAllEvent() {
        return [{
            hikeId: 1,
            hikerId: 1,
            hikerName: "Xu, Yu-Chen",
            location: "24.937596, 121.021746",
            radius: 5,
            alertId: 1,
            alertLevel: "1",
            eventId: 1,
            eventType: "Falling rocks",
            eventInfo: "eventInfo",
            eventTime: "5/26 06:49:31",
            ttl: 1
        }, {
            hikeId: 2,
            hikerId: 2,
            hikerName: "Xu, Yu-Chen",
            location: "24.937596, 121.021746",
            radius: 5,
            alertId: 1,
            alertLevel: "1",
            eventId: 1,
            eventType: "Falling rocks",
            eventInfo: "eventInfo",
            eventTime: "5/26 06:49:31",
            ttl: 1
        }]
    }
}
