import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  // get all notifications of a user in Observable format.
  getNotifications(userId: string): Observable<Notification[]> {
    return this.http.get<Notification[]>(
      `${environment.BASE_URL}/notifications/user/${userId}`
    );
  }

  // creates a fundraiser and returns it in observable format
  createNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(
      `${environment.BASE_URL}/notifications/`,
      notification
    );
  }

  // delete a fundraiser given a user id and notification id
  deleteNotification(): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.BASE_URL}/notifications/`);
  }

  //update notification
  // TODO

  // get read notification
  // TODO

  // get unread notification
  // TODO
}
