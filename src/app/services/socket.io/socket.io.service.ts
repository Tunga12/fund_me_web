import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private _socket: any;

  constructor() {

    let token = localStorage.getItem('x-auth-token');
    // Connect Socket with server URL
    this._socket = io.io(`${environment.BASE_URL}?token=${token}`);
   }

   listen(eventName: string):Observable<any>{
    return new Observable(
      (subscriber)=>{
        this._socket.on(eventName,(data:any)=>{
          subscriber.next(data);
        });
      }
    );
   }

}
