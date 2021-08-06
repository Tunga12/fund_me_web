import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from './../../services/notification/notification.service';
import { Subscription } from 'rxjs';
import { Notification } from './../../models/notification.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  loading = false;
  notifications!: Notification[];

  notificatonSub?: Subscription;
  errorMessage: any;
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() {
    this.loading = true;
    this.notificatonSub = this.notificationService.getNotifications().subscribe(
      (notifications) => {
        this.notifications = notifications;
        console.log(notifications);
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }
  deleteNotifcation(notification: Notification) {
    let index = this.notifications.indexOf(notification);
    this.notificatonSub = this.notificationService
      .deleteNotification(notification)
      .subscribe(
        () => {
          this.notifications.splice(index, 1);
        },
        (error) => {
          this.errorMessage = error.error;
        }
      );
  }

  ngOnDestroy() {
    this.notificatonSub?.unsubscribe();
  }
}
