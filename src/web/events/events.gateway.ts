import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { EventDto } from '../../share/dto/event.dto';
import { DashboardDto } from '../../share/dto/dashboard.dto';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private _logger: Logger) {
    _logger.setContext(EventsGateway.name);
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    this._logger.debug(data);
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  newEvent(event: EventDto) {
    this.server.emit('event', event);
  }

  newTest(message: string): void {
    this.server.emit('test', message);
  }

  newDashboard(dashboard: DashboardDto) {
    this.server.emit('dashboard', dashboard);
  }
}