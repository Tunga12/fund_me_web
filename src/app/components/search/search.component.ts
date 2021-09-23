import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserPage } from 'src/app/models/fundraiser-page.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { CurrencyConverterService } from 'src/app/services/currency-converter/currency-converter.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit , OnDestroy{
  param = '';
  loading = true; // to show loading spinner till the fundraisers are available
  errorMessage = '';

  searchedFundraisers: Fundraiser[] = [];

  fundraiserSub?: Subscription;

  fundraiserHome?: FundraiserPage;
  currentPage: number = 0;
  exchangeRate: number=1;
  exchangeRateSubscription: any;

  constructor(
    private fundraiserService: FundraiserService,
    private activatedRoute: ActivatedRoute,
    private docTitle: Title,
    private currencyConverterService: CurrencyConverterService,
  ) { }

  ngOnInit(): void {
    this.docTitle.setTitle('Search');
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.param = param.get('q') || '';
      this.searchFundraisers();
    });
  }

  //search fundraisers of the current page
  searchFundraisers() {
    this.fundraiserSub = this.fundraiserService
      .search(this.param, this.currentPage)
      .subscribe(
        (fundraiserHome: FundraiserPage) => {
          this.fundraiserHome = fundraiserHome;
          this.searchedFundraisers = [
            // ...this.searchedFundraisers,
            ...fundraiserHome.fundraisers,
          ];
          this.loading = false;
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          console.log(error.error);
          this.errorMessage = error.status===404?'':'Unable to load fundraisers';
        }
      );
  }

  // checks if the current page has next page
  hasNext() {
    return this.fundraiserHome?.hasNextPage || false;
  }

  // get the fundraisers on the next page
  nextPage() {
    this.currentPage += 1;
    this.searchFundraisers();
  }

 

   
  // unsubscribe if from all subscriptions
  ngOnDestroy(): void {
    if (this.fundraiserSub) this.fundraiserSub.unsubscribe();
  }
}
