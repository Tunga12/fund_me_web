import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { HomeFundraiser } from 'src/app/models/home-fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  param = '';
  loading = true; // to show loading spinner till the fundraisers are available
  errorMessage = '';
  fundraisers: Fundraiser[] = [];

  searchedFundarisers: Fundraiser[] = [];

  fundraiserSub?: Subscription;

  cols: Subject<any> = new Subject();
  constructor(
    private fundraiserService: FundraiserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(
      (param) => {
        this.param = param.get('q') || '';
        this.getFundraisers();
      }
    );
    console.log(this.param);
    // this.search();
    console.log(this.searchedFundarisers);
  }

  //get fundrisers of the first page
  getFundraisers() {
    this.fundraiserSub = this.fundraiserService.getFundraisers().subscribe(
      (fundraiser: HomeFundraiser) => {
        this.fundraisers = [...this.fundraisers, ...fundraiser.fundraisers];
        this.loading = false;
        this.search();
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        console.log(error.error);
        this.errorMessage = 'Unable to load fundraisers';
      }
    );
  }

  search() {
    this.searchedFundarisers = this.fundraisers.filter((fund) => {
      // console.log('h'.includes('h'));
      return fund.title.toLowerCase().includes(this.param.toLowerCase());
    });
  }

  percentage(fund: Fundraiser): number {
    return this.fundraiserService.getPercentage(fund);
  }

  // goto create page
  createPage() {
    console.log('click');

    this.router.navigateByUrl('/create');
  }
  // unsubscribe if from all subscriptions
  ngOnDestroy(): void {
    if (this.fundraiserSub) this.fundraiserSub.unsubscribe();
  }
}
