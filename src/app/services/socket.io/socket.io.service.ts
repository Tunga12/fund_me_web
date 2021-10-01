import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  constructor(private socket: Socket) {}
  getMessage(eventName: string) {
    // this.socket.emit(eventName);
    console.log(eventName);

    return this.socket.fromEvent<any>(eventName);
  }
}
