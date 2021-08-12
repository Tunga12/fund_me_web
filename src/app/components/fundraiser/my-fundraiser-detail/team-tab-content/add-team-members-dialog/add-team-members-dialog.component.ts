import { Component, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImportContactsDialogComponent } from '../../../../teams/import-contacts-dialog/import-contacts-dialog.component';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { TeamService } from '../../../../../services/team/team.service';
import { Fundraiser } from '../../../../../models/fundraiser.model';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';

@Component({
  selector: 'app-add-team-members-dialog',
  templateUrl: './add-team-members-dialog.component.html',
  styleUrls: ['./add-team-members-dialog.component.css'],
})
export class AddTeamMembersDialogComponent implements OnInit, OnDestroy {
  // emails: string[] = [];
  fundraiser!: Fundraiser;
  form: FormGroup;

  teamSub?: Subscription;
  errorMessage = '';
  loading = false;
  constructor(
    private dialog: MatDialog,
    private teamSevice: TeamService,
    // private fundraiserServ: FundraiserService,
    private snackbarService: SnackbarService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        // Validators.minLength(5),
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
    this.loading = true;
    let email = this.form.value['email'];
    console.log(email);
    this.teamSub = this.teamSevice
      .addMember({ email: email }, this.fundraiser._id!)
      .subscribe(
        (team) => {
          this.loading = false;
          this.fundraiser?.teams?.push(team);
          // this.getFundriser();
          this.dialog.closeAll();
          console.log(team);
          this.snackBar.open(
            'Invaitation successful',
            'close',
            this.snackbarService.getConfig()
          );
        },
        (error) => {
          this.loading = false;
          console.log(error.error);
          this.errorMessage = error.error;
        }
      );
  }

  // // get fundriser using id
  // getFundriser() {
  //   this.loading = true;
  //   this.fundraiserServ.getFundraiser(this.fundraiser?._id!).subscribe(
  //     (fundraiser) => {
  //       this.fundraiser = fundraiser;
  //       this.loading = false;
  //     },
  //     (error) => {
  //       console.log(error);
  //       console.log(error.status);
  //       this.loading = false;
  //       this.errorMessage = navigator.onLine
  //         ? error.error
  //         : 'You are offline, please check your internet connection!';
  //     }
  //   );
  // }

  removeEmail(email: string) {
    // let index = this.emails.indexOf(email);
    // this.emails.splice(index, 1);
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
