import { Component, OnInit, OnDestroy } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserPage } from '../../../models/fundraiser-page.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';

@Component({
  selector: 'app-my-fundraisers',
  templateUrl: './my-fundraisers.component.html',
  styleUrls: ['./my-fundraisers.component.scss']
})
export class MyFundraisersComponent implements OnInit, OnDestroy {
  tabLinks = ['organizer', 'team-member'];
  loading = true;
  myFundraisers: Fundraiser[] = [];

  fundraiserSUb?: Subscription;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private fundraiserService: FundraiserService,
    private docTitle: Title
  ) { }

  ngOnInit(): void {
    this.docTitle.setTitle('My fundraisers');
    // then get fundraisers
    this.getMyFundraisers();
  }

  manageFundraiser() {
    this.router.navigateByUrl('/my-fundraiser-detail');
  }

  // get fundraisers of current user
  getMyFundraisers() {
    this.fundraiserSUb = this.fundraiserService.getMyFundraisers().subscribe(
      (fundraisersPage: FundraiserPage) => {
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
  ngOnDestroy(): void {
    this.fundraiserSUb?.unsubscribe();
  }



  createFundraiser() {
    this.router.navigateByUrl('/create');
  }
}

