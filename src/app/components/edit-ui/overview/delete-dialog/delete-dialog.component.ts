import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fundraiser } from 'src/app/models/fundraiser.model';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnDestroy {
  fundraiserSub?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fundraiserService: FundraiserService,
    private router: Router,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fundraiser
  ) {
    console.log('constructor', this.data);
  }

  // delete current fundraiser
  deleteFundraiser() {
    let fundId = this.activatedRoute.snapshot.paramMap.get('id');
    this.fundraiserSub = this.fundraiserService
      .deleteFundraiser(this.data._id ?? fundId ?? '')
      .subscribe(
        (message) => {
          console.log(message);
          
          this.dialogRef.close();
          this.router.navigateByUrl(
            `/my-fundraisers/${this.data.organizer?._id}`
            );
        },
        (err) => {
          console.log('error occured');
          this.router.navigateByUrl(
             `/my-fundraisers/${this.data.organizer?._id}`
          );
            this.dialogRef.close();
          
        }
      );
  }

  ngOnDestroy(): void {
    this.fundraiserSub?.unsubscribe();
  }
}
