import { Injectable } from '@nestjs/common';
import { Event, EventStatus } from '../../share/models/event.model';

@Injectable()
export class EventService {

  events: Array<Event> = [
    {
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
    }
  ]

  getEvents(userId: number) {
    return this.events;
  }

  createEvent(userId: number, event: Event) {
    console.log(event);
    // TODO
    return true;
  }

}
