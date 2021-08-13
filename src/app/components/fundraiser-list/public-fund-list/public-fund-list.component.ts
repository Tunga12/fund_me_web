import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { HomeFundraiser } from 'src/app/models/home-fundraiser.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';

@Component({
  selector: 'app-public-fund-list',
  templateUrl: './public-fund-list.component.html',
  styleUrls: ['./public-fund-list.component.css']
})
export class PublicFundListComponent implements OnInit, OnDestroy {
  loading = true; // to show loading spinner till the fundraisers are available
  errorMessage = '';
  fundraisers: Fundraiser[] = [];
  fundraiserSub?: Subscription;

  currentPage = 0;
  fundraiserHome?: HomeFundraiser;
  constructor(
    private fundraiserService: FundraiserService,
    private docTitle: Title,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.docTitle.setTitle('Home page');

    this.getFundraisers();
  }

  //get fundrisers of the first page
  getFundraisers() {
    this.fundraiserSub = this.fundraiserService
      .getFundraisers(this.currentPage)
      .subscribe(
        (fundraiserHome: HomeFundraiser) => {
          // this.currentPage=
          this.fundraiserHome = fundraiserHome;
          this.fundraisers = [
            ...this.fundraisers,
            ...fundraiserHome.fundraisers,
          ];
          this.loading = false;
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          console.log(error.error);
          this.errorMessage = 'Unable to load fundraisers';
        }
      );
  }

  // checks if the current page has next page
  hasNext() {
    return this.fundraiserHome?.hasNextPage;
  }

  // get the fundraisers on the next page
  nextPage() {
    this.currentPage += 1;
    this.getFundraisers();
  }

  percentage(fund: Fundraiser): number {
    return this.fundraiserService.getPercentage(fund);
  }

  // goto create page
  // unsubscribe if from all subscriptions
  ngOnDestroy(): void {
    if (this.fundraiserSub) this.fundraiserSub.unsubscribe();
  }
}
