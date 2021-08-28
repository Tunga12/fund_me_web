import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { ShareArgs } from 'src/app/models/share-buttons-args';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';

import { PostAnUpdateComponent } from '../../post-an-update/post-an-update.component';
import { ShareDialogComponent } from '../../share-dialog/share-dialog.component';
import { Update } from './../../../models/update.model';

@Component({
  selector: 'app-detail',
  templateUrl: './my-fundraiser-detail.component.html',
  styleUrls: ['./my-fundraiser-detail.component.css'],
})
export class MyFundraiserDetailComponent implements OnInit, OnDestroy {
  userId = localStorage.getItem('userId');
  tabs = [1, 2, 3];
  update!: Update;
  percentage: number = 0;

  fundraiserId: string = '';
  fundraiser!: Fundraiser;
  loading = false;
  errorMessage = '';

  // subscriptions
  fundraiserSub?: Subscription;
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private fundraiserServ: FundraiserService,
    private docTitle: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.docTitle.setTitle('Manage fundraiser');
    // get the id parameter from router
    this.fundraiserId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.getFundriser();
  }

  // get fundriser using id
  getFundriser() {
    this.loading = true;
    this.fundraiserServ.getFundraiser(this.fundraiserId).subscribe(
      (fundraiser) => {
        this.fundraiser = fundraiser;
        this.loading = false;
        this.percentage = this.fundraiserServ.getPercentage(this.fundraiser);
        console.log(fundraiser);
      },
      (error) => {
        console.log(error);
        console.log(error.status);
        this.loading = false;
        this.errorMessage = navigator.onLine
          ? error.error
          : 'You are offline, please check your internet connection!';
      }
    );
  }

  isOrganizer() {
    return this.fundraiser.organizer?._id === this.userId;
  }

  isBeneficiary() {
    return this.fundraiser?.beneficiary?._id === this.userId;
  }

  withdrawal(id: string) {
    {
      this.fundraiser.withdraw
        ? this.router.navigate(['/my-fundraiser/withdrawals/', id,'overview'])
        : this.router.navigate(['/withdrawal', id]);
    }
  }

  //  opendialog for update
  openUpdateDialog() {
    this.dialog.open(PostAnUpdateComponent, {
      data: { mode: 'Post', update: this.update, fundraiser: this.fundraiser },
    });
  }

  openShareDialog() {
    let data: ShareArgs = {
      url: `http://localhost:4200/fundraiser-detail/${this.fundraiser?._id}?ref=${this.userId}`,
      image: this.fundraiser?.image,
      title: this.fundraiser?.title,
      description: `Hi, I havae created a fundraiser on gofundme ${
        this.fundraiser?.beneficiary
          ? 'to help' + this.fundraiser.beneficiary.firstName
          : ''
      } please signup and help me by donating and sharing it to your friends. thanks!`,
    };
    this.dialog.open(ShareDialogComponent, {
      data: data,
    });
  }

  ngOnDestroy(): void {
    this.fundraiserSub?.unsubscribe();
  }
}
