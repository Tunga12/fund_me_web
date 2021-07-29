import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from './../../services/notification/notification.service';
import { Subscription } from 'rxjs';
import { Notification } from './../../models/notification.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications!: Notification[];

  notificatonSub?: Subscription;
  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() {
    this.notificatonSub = this.notificationService.getNotifications().subscribe(
      (notifications) => {
        this.notifications = notifications;
        console.log(notifications);
      }
    );
  }
    deleteNotifcation(notification:Notification){
      let index = this.notifications.indexOf(notification);
      this.notificatonSub = this.notificationService
        .deleteNotification(notification)
        .subscribe(
          () => {
            this.notifications.splice(index, 1);
           },
          () => {
            this.notifications.splice(index, 1);
                    }
        );
    }

  ngOnDestroy() {
    this.notificatonSub?.unsubscribe();
}
}
