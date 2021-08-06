import {
  Component,
  Output,
  EventEmitter,
  Input,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnInit, OnDestroy {

  fundraiserSub?: Subscription;
  fundraiser!: Fundraiser;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fundraiserService: FundraiserService,
    private router: Router,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fundraiser
  ) {
    console.log('constructor', this.data);
  }
  ngOnInit(): void {
    this.fundraiser = this.data;
  }

  // delete() {
  //   this.deleteEvent.emit();
  // }
  // delete current fundraiser
  deleteFundraiser() {
    let fundId = this.activatedRoute.snapshot.paramMap.get('id');
    this.fundraiserSub = this.fundraiserService
      .deleteFundraiser(this.fundraiser._id ?? fundId ?? '')
      .subscribe(
        (message) => {
          console.log(message);
          this.dialogRef.close();
          this.router.navigateByUrl(
            `/my-fundraisers/${this.fundraiser.organizer?._id}`
          );
        },
        (err) => {
          console.log('error occured');
          this.router.navigateByUrl(
            `/my-fundraisers/${this.fundraiser.organizer?._id}`
          );
          this.dialogRef.close();
        }
      );
  }
  ngOnDestroy(): void {
    this.fundraiserSub?.unsubscribe();
  }
}
