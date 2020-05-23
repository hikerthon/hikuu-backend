import { Injectable } from '@nestjs/common';
import { Event } from './event';

@Injectable()
export class EventService {
  events: Array<Event> = [{ eType: 'a', description: 'des', userId: 1, lat: 24.937596, lng: 121.021746, }, { eType: 'b', description: 'des1', userId: 2, lat: 24.937596, lng: 121.021746 }];

  getEvents() {
    return this.events;
  }

  createEvent(event: Event) {
    console.log(event);
    // TODO
  }

}
