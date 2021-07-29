import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPhotoVideoDialogComponent } from '../post-an-update/add-photo-video-dialog/add-photo-video-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-ui',
  templateUrl: './edit-ui.component.html',
  styleUrls: ['./edit-ui.component.css'],
})
export class EditUiComponent implements OnInit, OnDestroy {
  fundraiserId: string = '';
  fundraiser!: Fundraiser;
  tabs = [1, 2, 3, 4];
  fundraiserSub?: Subscription;
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private fundraiserServ: FundraiserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // get the id parameter from router
    this.fundraiserId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.getFundriser();
  }

  // get fundriser using id
  getFundriser() {
    this.fundraiserSub = this.fundraiserServ
      .getFundraiser(this.fundraiserId)
      .subscribe((fundraiser) => {
        this.fundraiser = fundraiser;
      });
  }

  openAddPhotoOrVedioDialog() {
    this.dialog
      .open(AddPhotoVideoDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }

  backToDetailPage() {
    this.router.navigateByUrl(`/my-fundraiser-detail/${this.fundraiser._id}`);
  }

  ngOnDestroy(): void {
    this.fundraiserSub?.unsubscribe();
  }
}
