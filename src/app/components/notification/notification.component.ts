import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from './../../services/notification/notification.service';
import { Subscription } from 'rxjs';
import { Notification } from './../../models/notification.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  loading = false;
  notifications!: Notification[];

  notificatonSub?: Subscription;
  errorMessage? = '';
  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private snackbarService: SnackbarService
  ) {}

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
      () => {
        this.loading = false;
        this.errorMessage = 'Unable to get notifications';
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
          this.snackBar.open(
            'Notification deleted',
            'close',
            this.snackbarService.getConfig()
          );
        },
        (error) => {
          this.errorMessage = 'Unable to delete notifications';
        }
      );
  }

  ngOnDestroy() {
    this.notificatonSub?.unsubscribe();
  }
}
