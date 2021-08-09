import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from '../../shared/share-dialog/share-dialog.component';
import { PostAnUpdateComponent } from '../../post-an-update/post-an-update.component';
import { ActivatedRoute } from '@angular/router';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { Update } from './../../../models/update.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './my-fundraiser-detail.component.html',
  styleUrls: ['./my-fundraiser-detail.component.css'],
})
export class MyFundraiserDetailComponent implements OnInit {
  fundraiserId: string = '';
  fundraiser!: Fundraiser;
  update!: Update;
  tabs = [1, 2, 3];
  loading = false;
  errorMessage = '';
  percentage: number = 0;
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private fundraiserServ: FundraiserService,
    private docTitle: Title
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

  //  opendialog for update
  openUpdateDialog() {
    this.dialog.open(PostAnUpdateComponent, {
      data: { mode: 'Post', update: this.update, fundraiser: this.fundraiser },
    });
  }

  openShareDialog() {
    this.dialog.open(ShareDialogComponent, { data: { id: 1 } });
  }
}
