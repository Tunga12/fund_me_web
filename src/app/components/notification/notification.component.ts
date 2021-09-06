import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from './../../services/notification/notification.service';
import { Subscription } from 'rxjs';
import { Notification } from './../../models/notification.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './../../services/snackbar/snackbar.service';
import { TeamService } from './../../services/team/team.service';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { environment } from './../../../environments/environment';
import { SocketIoService } from './../../services/socket.io/socket.io.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  count = 0;
  loading = false;
  notifications: Notification[] = [];
  accepedTeamInvitations: Notification[] = [];
  declinedTeamInvitations: Notification[] = [];

  errorMessage? = '';

  notificatonSub?: Subscription;
  teamSub?: Subscription;
  fundraiserSub?: Subscription;
  userId = localStorage.getItem('userId')!;

  constructor(
    private snackBar: MatSnackBar,
    private snackbarService: SnackbarService,
    private teamService: TeamService,
    private fundraiserService: FundraiserService,
    public notificationService: NotificationService,
    private socketService: SocketIoService
  ) {}

  ngOnInit(): void {
    this.getNotifications();
    // listen to new notifications
    this.notificatonSub = this.socketService
      .listen('new notification')
      .subscribe((data: any) => {
        this.notifications.unshift(data);
        console.log(data);
      });

    // // listen to unread notificatios
    this.notificatonSub = this.socketService
      .listen('unread notification count')
      .subscribe((data: any) => {
        // this.data = data;
        this.count = data;
        console.log(this.count);
        console.log(data);
      });

    // // listen to read notifications
    this.notificatonSub = this.socketService
      .listen('viewed notification')
      .subscribe((data: any) => {
        // this.data = data;
        console.log(data);
      });

    // // listen to error
    // this.socket.on('error', (data: any) => {
    //   console.log(data);
    // });
  }

  getNotifications() {
    this.loading = true;
    this.notificatonSub = this.notificationService.getNotifications().subscribe(
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

  deleteNotifcation(notification: Notification) {
    let index = this.notifications.indexOf(notification);
    this.notificatonSub = this.notificationService
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
  markAsRead(notifiacation: Notification) {
    !notifiacation.viewed?.includes(localStorage.getItem('userId')!)
      ? (this.notificatonSub = this.notificationService
          .readNotification(notifiacation)
          .subscribe(
            () => {
              notifiacation.viewed?.push(this.userId);
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
  acceptTeamInvitation(notifiacation: Notification) {
    this.teamSub = this.teamService
      .acceptInvitation(notifiacation.target)
      .subscribe(
        () => {
          this.markAsRead(notifiacation);
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
  declineTeamInvitation(notifiacation: Notification) {
    this.teamSub = this.teamService
      .declineInvitation(notifiacation.target)
      .subscribe(
        () => {
          this.markAsRead(notifiacation);
          this.reset();
          this.snackBar.open(
            'Team invitation declined',
            'close',
            this.snackbarService.getConfig()
          );
        },
        (error) => {
          console.log(error.error);
          this.errorMessage = 'Unable to delcline, please try later';
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

  //  checks if the notifiation is about beneficiary invitation
  isBeneficiaryInvitation(notification: Notification) {
    return notification.title === 'Beneficiary invitation';
  }

  // reset to initial state
  reset() {
    this.errorMessage = '';
  }

  ngOnDestroy() {
    this.notificatonSub?.unsubscribe();
    this.teamSub?.unsubscribe();
    this.fundraiserSub?.unsubscribe();
  }
}
