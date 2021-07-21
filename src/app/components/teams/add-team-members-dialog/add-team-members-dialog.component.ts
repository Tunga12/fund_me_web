import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportContactsDialogComponent } from './../import-contacts-dialog/import-contacts-dialog.component';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from 'ngx-editor';

@Component({
  selector: 'app-add-team-members-dialog',
  templateUrl: './add-team-members-dialog.component.html',
  styleUrls: ['./add-team-members-dialog.component.css'],
})
export class AddTeamMembersDialogComponent implements OnInit {
  emails: string[] = [];
  email = '';
  form;
  constructor(private dialog: MatDialog) {
    this.form = new FormGroup({
      email: new FormControl("dfdf"),
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
  openImportContactsDialog() {
    this.dialog
      .open(ImportContactsDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }
}
