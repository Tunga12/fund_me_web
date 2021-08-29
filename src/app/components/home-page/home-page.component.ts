import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserPage } from 'src/app/models/fundraiser-page.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';

import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit,OnDestroy {
  loading = false; // to show loading spinner till the fundraisers are available
  errorMessage = '';
  fundraisers: Fundraiser[] = [];
  fundraiserSub?: Subscription;

  currentPage = 0;
  fundraiserHome?: FundraiserPage;
  
  constructor(
    private router: Router,
    private docTitle: Title,
    private fundraiserService: FundraiserService,
    public authService: AuthService

  ) { }

  ngOnInit(): void {
    this.docTitle.setTitle('Home page');
    this.getFundraisers();
  }

  //get fundrisers of a page
  getFundraisers() {
    this.loading = true;
    this.fundraiserSub = this.fundraiserService
      .getFundraisers(this.currentPage)
      .subscribe(
        (fundraiserHome: FundraiserPage) => {
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
    return this.fundraiserHome?.hasNextPage||false;
  }

  // get the fundraisers on the next page
  nextPage() {
    this.currentPage += 1;
    this.getFundraisers();
  }
  
  // unsubscribe if from all subscriptions
  ngOnDestroy(): void {
    if (this.fundraiserSub) this.fundraiserSub.unsubscribe();
  }
  
}
