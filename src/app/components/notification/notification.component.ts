import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from './../../services/notification/notification.service';
import { Subscription } from 'rxjs';
import { Notification } from './../../models/notification.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './../../services/snackbar/snackbar.service';
import { TeamService } from './../../services/team/team.service';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { io } from 'socket.io-client';
import { SocketIoService } from './../../services/socket.io/socket.io.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  count: any = 0;
  loading = false;
  notifications: Notification[] = [];
  acceptedTeamInvitations: Notification[] = [];
  declinedTeamInvitations: Notification[] = [];

  errorMessage? = '';

  notificationSub?: Subscription;
  teamSub?: Subscription;
  fundraiserSub?: Subscription;
  userId = localStorage.getItem('userId')!;

  constructor(
    private snackBar: MatSnackBar,
    private snackbarService: SnackbarService,
    private teamService: TeamService,
    private fundraiserService: FundraiserService,
    private socketIoService: SocketIoService,
    public notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.socketIoService.onAllNotifications().subscribe(
      (data) => {
        console.log(data);
        // this.notifications=data;
      },
      (err) => {
        console.log(err);
      }
    );

    this.socketIoService.onUnreadNotificationCount().subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
    // this.getNotifications();
  }

  getNotifications() {
    this.loading = true;
    this.notificationSub = this.notificationService
      .getNotifications()
      .subscribe(
        (notifications) => {
          this.notifications = notifications.reverse();
          console.log(notifications);
          this.loading = false;
        },
        () => {
          this.loading = false;
          this.errorMessage = 'Unable to get notifications';
        }
      );
  }

  deleteNotification(notification: Notification) {
    let index = this.notifications.indexOf(notification);
    this.notificationSub = this.notificationService
      .deleteNotification(notification)
      .subscribe(
        () => {
          this.reset();
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

  // marks a notification as read if not already read
  markAsRead(notification: Notification) {
    !notification.viewed?.includes(localStorage.getItem('userId')!)
      ? (this.notificationSub = this.notificationService
          .readNotification(notification)
          .subscribe(
            () => {
              notification.viewed?.push(this.userId);
              this.reset();
            },
            (error) => {
              this.errorMessage = error.error;
              console.log(error.error);
            }
          ))
      : '';
  }

  // accept team membership invitation
  acceptTeamInvitation(notification: Notification) {
    this.teamSub = this.teamService
      .acceptInvitation(notification.target)
      .subscribe(
        () => {
          this.markAsRead(notification);
          this.reset();
          this.snackBar.open(
            'Invitation accepted',
            'close',
            this.snackbarService.getConfig()
          );
        },
        (error) => {
          console.log(error.error);
          this.errorMessage = 'Unable to accept, please try later';
        }
      );
  }

  // decline team membership invitation
  declineTeamInvitation(notification: Notification) {
    this.teamSub = this.teamService
      .declineInvitation(notification.target)
      .subscribe(
        () => {
          this.markAsRead(notification);
          this.reset();
          this.snackBar.open(
            'Team invitation declined',
            'close',
            this.snackbarService.getConfig()
          );
        },
        (error) => {
          console.log(error.error);
          this.errorMessage = 'Unable to decline, please try later';
        }
      );
  }

  // accept beneficiaryInvitation
  async acceptBeneficiaryInvitation(notification: Notification) {
    let fundraiser!: Fundraiser;
    await this.fundraiserService
      .getFundraiserAsync(notification.target)
      .then((fund) => {
        fundraiser = fund;
      });

    if (notification.recipients && fundraiser) {
      this.fundraiserSub = this.fundraiserService
        .setBeneficiary(fundraiser, notification.recipients[0])
        .subscribe(
          (fund) => {
            console.log(fund);
          },
          (error) => {
            this.errorMessage = error.error;
            console.log(error.error);
          }
        );
    }
  }

  // checks if the notification is about team member invitation
  isTeamInvitation(notification: Notification) {
    return notification.notificationType === 'Team Member';
  }

  //  checks if the notification is about beneficiary invitation
  isBeneficiaryInvitation(notification: Notification) {
    return notification.title === 'Beneficiary invitation';
  }

  // reset to initial state
  reset() {
    this.errorMessage = '';
  }

  ngOnDestroy() {
    this.notificationSub?.unsubscribe();
    this.teamSub?.unsubscribe();
    this.fundraiserSub?.unsubscribe();
  }
}
