import { Component, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImportContactsDialogComponent } from './../import-contacts-dialog/import-contacts-dialog.component';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { TeamService } from './../../../services/team/team.service';
import { Fundraiser } from './../../../models/fundraiser.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-team-members-dialog',
  templateUrl: './add-team-members-dialog.component.html',
  styleUrls: ['./add-team-members-dialog.component.css'],
})
export class AddTeamMembersDialogComponent implements OnInit, OnDestroy {
  emails: string[] = [];
  fundraiser!: Fundraiser;
  form: FormGroup;

  teamSub?: Subscription;
  errorMessage = '';

  constructor(
    private dialog: MatDialog,
    private teamSevice: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
      ]),
    });
  }

  ngOnInit(): void {
    this.fundraiser = this.data;
    console.log(this.fundraiser);
  }

  public get email(): AbstractControl | null {
    return this.form.get('email');
  }

  addEmail() {
    let email = this.form.value['email'];
    console.log(email);

    this.teamSub = this.teamSevice
    .addMember(email, this.fundraiser._id!)
    .subscribe(
      (team) => {
        console.log(team);
        let index = this.emails.indexOf(email);
        if (index < 0) this.emails.push(email);
        },
        (error) => {
          console.log(error.error);
          this.errorMessage = error.error;
        }
      );
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

  ngOnDestroy(): void {
    this.teamSub?.unsubscribe();
  }
}
