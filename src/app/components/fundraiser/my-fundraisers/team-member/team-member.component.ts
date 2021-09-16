import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserPage } from 'src/app/models/fundraiser-page.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})
export class TeamMemberComponent implements OnInit, OnDestroy {
  loading = true;
  myFundraisers: Fundraiser[] = [];

  fundraiserSUb?: Subscription;
  errorMessage: string = '';

  currentPage = 0;
  fundraiserHome?: FundraiserPage;
  
  constructor(
    private fundraiserServ: FundraiserService,
    private docTitle: Title
  ) {}

  ngOnInit(): void {
    this.docTitle.setTitle('My fundaisers| team');
    // then get fundraisers
    this.getMyFundraisers();
  }


  // get fundraisers of current user
  getMyFundraisers() {
    this.fundraiserSUb = this.fundraiserServ.getMemeberFundraisers().subscribe(
      (fundraisersPage:FundraiserPage) => {
        this.loading = false;
        this.myFundraisers = fundraisersPage.fundraisers;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        console.log(error.error);
        this.errorMessage =
          error.status === 404
            ? "You don't have any fundraiser yet."
            : 'Unable to load your fundraisers, please try later';
      }
    );
  }

// checks if the current page has next page
hasNext() {
  return this.fundraiserHome?.hasNextPage||false;
}

// get the fundraisers on the next page
nextPage() {
  this.currentPage += 1;
  this.getMyFundraisers();
}

// unsubscribe if from all subscriptions
ngOnDestroy(): void {
  this.fundraiserSUb?.unsubscribe();
}
}
