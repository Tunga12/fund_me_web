import {
  Component,
  OnInit,
  OnDestroy,
  AfterContentInit,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { HomeFundraiser } from 'src/app/models/home-fundraiser.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatGridList } from '@angular/material/grid-list';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  loading = true; // to show loading spinner till the fundraisers are available
  errorMessage = '';
  fundraisers: Fundraiser[] = [];
  fundraiserSub?: Subscription;


  cols: Subject<any> = new Subject();
  constructor(
    private fundraiserService: FundraiserService,
   private router: Router
  ) { }


  ngOnInit(): void {
    this.getFundraisers();
  }

  //get fundrisers of the first page
  getFundraisers() {
    this.fundraiserSub = this.fundraiserService.getFundraisers().subscribe(
      (fundraiser: HomeFundraiser) => {
        this.fundraisers = [...this.fundraisers, ...fundraiser.fundraisers];
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        console.log(error.error);

        this.errorMessage = 'Unable to load fundraisers';
      }
    );
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
