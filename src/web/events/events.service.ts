import { Injectable } from '@nestjs/common';
import { EventStatus } from '../../share/models/event.model';

@Injectable()
export class EventsService {
    getAllEvent() {
        return [{
            hikeId: 1,
            hikerId: 1,
            reporter: "Xu, Yu-Chen",
            lat: 24.937596,
            long: 121.021746,
            radius: 5,
            alertId: 1,
            alertLevel: "1",
            eventId: 1,
            eventType: "Falling rocks",
            eventInfo: "eventInfo",
            eventTime: "11/10/2016, 11:49:36 AM",
            ttl: 1,
            status: EventStatus.Pending
        }, {
            hikeId: 2,
            hikerId: 2,
            reporter: "Xu, Yu-Chen",
            lat: 24.937596,
            long: 121.021746,
            radius: 5,
            alertId: 1,
            alertLevel: "1",
            eventId: 1,
            eventType: "Falling rocks",
            eventInfo: "eventInfo",
            eventTime: "11/10/2016, 11:49:36 AM",
            ttl: 1,
            status: EventStatus.Pending
        }]
    }


    getEventById() {
        return {
            hikeId: 1,
            hikerId: 1,
            reporter: "Xu, Yu-Chen",
            lat: 24.937596,
            long: 121.021746,
            radius: 5,
            alertId: 1,
            alertLevel: "1",
            eventId: 1,
            eventType: "Falling rocks",
            eventInfo: "eventInfo",
            eventTime: "11/10/2016, 11:49:36 AM",
            ttl: 1,
            status: EventStatus.Processing
        }
    }
}
