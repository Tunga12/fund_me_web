import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Notification } from './../../models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  // get all notifications of a user in Observable format.
  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(
      `${environment.BASE_URL}/notifications/user`
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
  deleteNotification(notification: Notification): Observable<boolean> {
    return this.http.delete<boolean>(
      `${environment.BASE_URL}/notifications/${notification._id}`
    );
  }
}
