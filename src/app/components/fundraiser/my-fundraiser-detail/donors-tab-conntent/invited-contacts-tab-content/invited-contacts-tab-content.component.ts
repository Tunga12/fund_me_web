import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhoneInviteDialogComponent } from 'src/app/components/invite/phone-invite-dialog/phone-invite-dialog.component';
import { EmailInviteDialogComponent } from './../../../../invite/email-invite-dialog/email-invite-dialog.component';

@Component({
  selector: 'invited-contacts-tab-content',
  templateUrl: './invited-contacts-tab-content.component.html',
  styleUrls: ['./invited-contacts-tab-content.component.css'],
})
export class InvitedContactsTabContentComponent  {
  constructor(private dialog: MatDialog) {}

  openEmailInviteDialog() {
    this.dialog
      .open(EmailInviteDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }

  openPhoneInviteDialog() {
    this.dialog
      .open(PhoneInviteDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }
}
