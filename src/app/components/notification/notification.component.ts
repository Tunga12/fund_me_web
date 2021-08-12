import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from './../../services/notification/notification.service';
import { Subscription } from 'rxjs';
import { Notification } from './../../models/notification.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './../../services/snackbar/snackbar.service';
import { TeamService } from './../../services/team/team.service';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { TeamMember } from 'src/app/models/team-memeber.model';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  loading = false;
  notifications!: Notification[];
  errorMessage? = '';

  acceptanceStatusLoading = false;

  notificatonSub?: Subscription;
  teamSub?: Subscription;
  fundraiserSub?: Subscription;
  userId = localStorage.getItem('userId')!;

  constructor(
    private snackBar: MatSnackBar,
    private snackbarService: SnackbarService,
    private teamService: TeamService,
    private fundraiserService: FundraiserService,
    public notificationService: NotificationService
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

  // checks if the user has already responded to this invitation or not
  responded(notificatin: Notification): boolean {
    let responded = false;
    let filtered: TeamMember[] | undefined = [];
    this.fundraiserSub = this.fundraiserService
      .getFundraiser(notificatin.target)
      .subscribe((fund) => {
        // console.log(fund);
      });
    return responded;
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
          console.log(error.error);
          this.errorMessage = 'Unable to delete notification';
        }
      );
  }

  // accept team membership invitation
  acceptInvitation(notifiacation: Notification) {
    this.teamSub = this.teamService
      .acceptInvitation(notifiacation.target)
      .subscribe(
        () => {
          this.markAsRead(notifiacation);
        },
        () => {
          this.errorMessage = 'Unable to accept, please try later';
        }
      );
  }

  // mark notification as read
  markAsRead(notifiacation: Notification) {
    this.notificatonSub = this.notificationService
      .readNotification(notifiacation)
      .subscribe(
        () => {
          notifiacation.viewed?.push(this.userId);
        },
        (error) => {
          this.errorMessage = error.error;
          console.log(error.error);
        }
      );
  }

  // decline team membership invitation
  declineInvitation(notifiacation: Notification) {
    this.teamSub = this.teamService
      .declineInvitation(notifiacation.target)
      .subscribe(
        () => {
          this.markAsRead(notifiacation);
        },
        () => {
          this.errorMessage = 'Unable to delcline, please try later';
        }
      );
  }

  ngOnDestroy() {
    this.notificatonSub?.unsubscribe();
    this.teamSub?.unsubscribe();
    this.fundraiserSub?.unsubscribe();
  }
}
