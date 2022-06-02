import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  socket: any;
  constructor() {
    this.socket = io('https://legasfund.com:5000', {
      query: { token: localStorage.getItem('x-auth-token') },
      transports: ['websocket'],
      withCredentials: true,
      secure: true
    });
  }

  listen(eventName: string) {
    const observable = new Observable<number>((observer) => {
      this.socket.on(eventName, (data: number | undefined) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  unreadNotificationCount() {
    const observable = new Observable<number>((observer) => {
      this.socket.on(
        'unread notification count',
        (data: number | undefined) => {
          observer.next(data);
        }
      );
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getUnreadCount() {
    this.socket.emit('get unread count');
  }
}
