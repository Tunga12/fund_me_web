import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { WhiteSpaceValidatorDirective } from 'src/app/validators/white-space.validator.directive';
import { UserService } from './../../services/user/user.service';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { Title } from '@angular/platform-browser';
import { SnackbarService } from './../../services/snackbar/snackbar.service';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css'],
})
export class AccountSettingComponent implements OnInit, OnDestroy {
  loading = false;
  changePassword = false;
  form!: FormGroup;
  errorMessage = '';
  user!: User;
  userSub?: Subscription;

  // validate the existance of whitesaces in our input
  whiteSpaceValidator = new WhiteSpaceValidatorDirective();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private title: Title,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Account setting');
    this.form = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          this.whiteSpaceValidator,
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          this.whiteSpaceValidator,
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
    this.getCurrentUser();
  }

  // get the currently logged in user
  getCurrentUser() {
    this.loading = true;
    this.userSub = this.userService.getCurrentUser().subscribe(
      (user) => {
        this.user = user;
        this.form.patchValue(user);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.log(error.error);
        this.errorMessage = error.error;
      }
    );
  }

  // save the changes=>update
  save() {
    this.loading = true;
    let updatedUser = this.form.value;
    this.userSub = this.userService.updateCurrentUser(updatedUser).subscribe(
      (user) => {
        this.user = user;
        this.form.patchValue(this.user);
        this.loading = false;
        this.snackBar.open(
          'Update saved seccuessfully',
          'close',
          this.snackbarService.getConfig()
        );
      },
      (error) => {
        this.loading = false;
        console.log(error.error);
        this.errorMessage = error.error;
        this.snackBar.open(
          this.errorMessage,
          'close',
          this.snackbarService.getConfig()
        );
      }
    );
  }

  // opens the chane password dialog
  openChangePasswordDialog() {
    this.dialog.open(PasswordResetComponent);
  }

  //open delete account dialog
  openDeleteAccountDialog() {
    this.dialog.open(DeleteAccountDialogComponent);
  }

  public get email(): AbstractControl {
    return this.form.get('email')!;
  }

  public get firstName(): AbstractControl {
    return this.form.get('firstName')!;
  }

  public get lastName(): AbstractControl {
    return this.form.get('lastName')!;
  }

  public get phone(): AbstractControl {
    return this.form.get('phoneNumber')!;
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
