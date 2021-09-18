import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  constructor(
      private socket:Socket
  ){}

  	// listen event
	onUnreadNotificationCount() {
        console.log('hello friend');
        
		return this.socket.fromEvent('unread notification count');
	}
}
