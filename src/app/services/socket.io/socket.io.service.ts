import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  socket: Socket;
  constructor() {
    this.socket = io(`http://178.62.55.81:5000`, {
      transports: ['websocket', 'polling'],
      reconnectionDelayMax: 10000,
      query: {
        token: localStorage.getItem('x-auth-token') || '',
      },
    });
  }


  public onAllNotifications = () => {
    return new Observable(observer => {
      this.socket.on('all notification', (msg:Notification[]) => {
        console.log(msg);
        observer.next(msg);
      });
    });
  };
  
  public onUnreadNotificationCount = () => {
    return new Observable(observer => {
      this.socket.on('unread notification count', (msg) => {
        console.log(msg);
        observer.next(msg);
      });
    });
  };


}
