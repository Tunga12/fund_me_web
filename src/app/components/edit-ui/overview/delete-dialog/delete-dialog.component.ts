import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit, OnDestroy {
  loading = false;
  errorMessage = '';
  fundraiserSub?: Subscription;
  fundraiser!: Fundraiser;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fundraiserService: FundraiserService,
    private router: Router,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fundraiser
  ) {}

  ngOnInit(): void {
    this.fundraiser = this.data;
  }

  deleteFundraiser() {
    this.errorMessage = '';
    this.loading = true;
    this.fundraiserSub = this.fundraiserService
      .deleteFundraiser(this.fundraiser._id!)
      .subscribe(
        () => {
          this.loading = false;
          this.dialogRef.close();
          this.router.navigate([`/my-fundraisers`, 'organizer']);
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.errorMessage = error.error;
          // this.dialogRef.close();
        }
      );
  }
  ngOnDestroy(): void {
    this.fundraiserSub?.unsubscribe();
  }
}
