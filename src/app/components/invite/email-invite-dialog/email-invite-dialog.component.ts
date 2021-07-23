import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-email-invite-dialog',
  templateUrl: './email-invite-dialog.component.html',
  styleUrls: ['./email-invite-dialog.component.css'],
})
export class EmailInviteDialogComponent implements OnInit {
  emails: string[] = [];
  email = '';
  name = '';
  form;
  constructor(private dialog: MatDialog) {
    this.form = new FormGroup({
      email: new FormControl(''),
      name: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  addEmail(email: string) {
    let index = this.emails.indexOf(email);
    if (index < 0) this.emails.push(email);
  }
  removeEmail(email: string) {
    let index = this.emails.indexOf(email);
    this.emails.splice(index, 1);
  }
}
