import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'fundraiser-list',
  templateUrl: './fundraiser-list.component.html',
  styleUrls: ['./fundraiser-list.component.css'],
})
export class FundraiserListComponent implements OnInit {
  loading = true;
  userId = '';
  myFundraisers: Fundraiser[] = [];

  fundraiserSUb?: Subscription;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private fundraiserServ: FundraiserService,
    private docTitle: Title
  ) {}

  ngOnInit(): void {
    this.docTitle.setTitle('My fundaisers');

    // then get fundraisers
    this.getMyFundraisers();

  }

  manageFundraiser() {
    this.router.navigateByUrl('/my-fundraiser-detail');
  }

  percentage(fund: Fundraiser): number {
    return this.fundraiserServ.getPercentage(fund);
  }

  // get fundraisers of current user
  getMyFundraisers() {
    this.fundraiserSUb = this.fundraiserServ.getMyFundraisers().subscribe(
      (fundraisers) => {
        this.loading = false;
        this.myFundraisers = fundraisers.fundraisers;
      },
      (error) => {
        this.loading = false;
        console.log(error.error);
        this.errorMessage =
          error.status === 404
            ? "You don't have any fundraiser yet."
            : 'Unable to load your fundraisers';
      }
    );
  }

  createFundraiser() {
    this.router.navigateByUrl('/create');
  }
  ngOnDestroy(): void {
    this.fundraiserSUb?.unsubscribe();
  }
}
