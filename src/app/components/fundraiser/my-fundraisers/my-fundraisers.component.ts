import { Component, OnInit } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { HomeFundraiser } from './../../../models/home-fundraiser.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';

@Component({
  selector: 'app-my-fundraisers',
  templateUrl: './my-fundraisers.component.html',
  styleUrls: ['./my-fundraisers.component.css']
})
export class MyFundraisersComponent implements OnInit {
  tabLinks=['organizer', 'team-member','beneficiary'];
  loading = true;
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

  // get fundraisers of current user
  getMyFundraisers() {
    this.fundraiserSUb = this.fundraiserServ.getMyFundraisers().subscribe(
      (fundraisersPage:HomeFundraiser) => {
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

