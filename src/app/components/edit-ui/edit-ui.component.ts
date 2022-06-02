import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPhotoVideoDialogComponent } from '../post-an-update/add-photo-video-dialog/add-photo-video-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-ui',
  templateUrl: './edit-ui.component.html',
  styleUrls: ['./edit-ui.component.scss'],
})
export class EditUiComponent implements OnInit, OnDestroy {
  loading = true;
  fundraiserId: string = '';
  fundraiser!: Fundraiser;
  tabs = ['Overview', 'Photo', 'Story', //'Notification'
  ];
  fundraiserSub?: Subscription;
  errorMessage = '';
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private fundraiserServ: FundraiserService,
    private router: Router,
    private docTitle: Title,
  ) { }

  ngOnInit(): void {
    this.docTitle.setTitle('Edit fundraiser');
    // get the id parameter from router
    this.fundraiserId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.getFundraiser();
  }

  // get fundraiser using id
  getFundraiser() {
    this.fundraiserSub = this.fundraiserServ
      .getFundraiser(this.fundraiserId)
      .subscribe((fundraiser) => {
        this.fundraiser = fundraiser;
        this.loading = false;
        console.log(this.fundraiser);
      },
        (error) => {
          this.errorMessage = "Failed to fetch fundraiser";
          console.log(error.error);
        });
  }


  openAddPhotoOrVideoDialog() {
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
