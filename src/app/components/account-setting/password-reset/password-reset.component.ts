import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from './../../../services/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit, OnDestroy {
  loading = false;
  form!: FormGroup;
  errorMessage = '';

  userSub?: Subscription;
  authSub?: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<PasswordResetComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}'
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    });
  }

  // change password
  changePassword() {
    this.loading = true;
    let currentUser: User;
    this.userSub = this.userService.getCurrentUser().subscribe(
      (user) => {
        currentUser = user;

        if (user.password === this.password.value) {
          this.updateUser(user);
        } else {
          this.loading = false;
          this.errorMessage = 'Incorrect password';
        }
      },

      (error) => {
        this.loading = false;
        this.errorMessage = error.error;
      }
    );
  }

  // update user to change password
  updateUser(user: User) {
    delete user._id;
    delete user.__v;
    this.userService
      .updateCurrentUser({
        ...user,
        password: this.newPassword.value,
      })
      .subscribe(
        () => {
          this.loading = false;
          this.dialogRef.close();
          this.snackBar.open(
            'Password changed succesfully',
            'Close',
            this.snackbarService.getConfig()
          );
        },
        (error) => {
          this.loading = false;
          this.errorMessage = error.error;
        }
      );
  }

  public get password(): AbstractControl {
    return this.form.get('password')!;
  }

  public get newPassword(): AbstractControl {
    return this.form.get('newPassword')!;
  }

  public get confirmPassword(): AbstractControl {
    return this.form.get('confirmPassword')!;
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.userSub?.unsubscribe();
  }
}
