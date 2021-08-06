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

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css'],
})
export class AccountSettingComponent implements OnInit, OnDestroy {
  changePassword = false;
  form!: FormGroup;
  errorMessage = '';
  user!: User;
  userSub?: Subscription;

  snackBarConfig: MatSnackBarConfig = {
    verticalPosition: 'top', // 'top' | 'bottom'
    horizontalPosition: 'end', //'start' | 'center' | 'end' | 'left' | 'right'
    duration: 2000,
  };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}
  // validate the existance of whitesaces in our input
  whiteSpaceValidator = new WhiteSpaceValidatorDirective();

  ngOnInit(): void {
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
    });
    this.getCurrentUser();
  }

  // get the currently logged in user
  getCurrentUser() {
    this.userSub = this.userService.getCurrentUser().subscribe(
      (user) => {
        this.user = user;
        this.form.patchValue(user);
      },
      (error) => {
        console.log(error.error);
        this.errorMessage = error.error;
      }
    );
  }

  // save the changes=>update
  save() {
    let updatedUser = { ...this.user, ...this.form.value };
    this.userSub = this.userService.updateCurrentUser(updatedUser).subscribe(
      (user) => {
        this.user = user;
        this.form.patchValue(this.user);
        this.snackBar.open(
          'Update saved seccuessfully',
          'close',
          this.snackBarConfig
        );
      },
      (error) => {
        console.log(error.error);
        this.errorMessage = error.error;
        this.snackBar.open(this.errorMessage, 'close', this.snackBarConfig);
      }
    );
  }

  // deletes teh currently logged in user
  deleteCurrentUser() {
    this.userSub = this.userService.deleteCurrentUser().subscribe(
      (user) => {
        console.log(user);
        localStorage.clear();
        this.router.navigate(['/home-page']);
      },
      (error) => {
        console.log(error.error);
        this.errorMessage = error.error;
        this.snackBar.open(this.errorMessage, 'close', this.snackBarConfig);
      }
    );
  }

  // opens the chane password dialog
  changePasswordDialog() {
    this.dialog.open(PasswordResetComponent);
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

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
