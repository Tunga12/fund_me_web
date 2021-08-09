import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.css'],
})
export class DeleteAccountDialogComponent implements OnInit, OnDestroy {
  loading = false;
  errorMessage = '';
  userSub?: Subscription;
  constructor(
    private userService: UserService,
    private router: Router,
    private dialogRef: MatDialogRef<DeleteAccountDialogComponent>,
    private snackBar: MatSnackBar,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}

  // deletes the currently logged in user
  deleteCurrentUser() {
    this.loading = true;
    this.userSub = this.userService.deleteCurrentUser().subscribe(
      (response) => {
        console.log(response);
        localStorage.clear();
        this.router.navigate(['/home-page']);
        this.loading = false;
        this.dialogRef.close();
      },
      (error) => {
        console.log(error.error);
        this.errorMessage = error.error;
        this.dialogRef.close();
        this.snackBar.open(
          this.errorMessage,
          'close',
          this.snackbarService.getConfig()
        );
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
