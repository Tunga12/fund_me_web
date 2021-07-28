import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { Fundraiser } from 'src/app/models/fundraiser.model';

@Component({
  selector: 'fundraiser-list',
  templateUrl: './fundraiser-list.component.html',
  styleUrls: ['./fundraiser-list.component.css'],
})
export class FundraiserListComponent implements OnInit {
  userId = "";
  myFundraisers: Fundraiser[] = [];
  constructor(
    private router: Router,
    private fundraiserServ: FundraiserService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    // first get user id
    this.getUserId();

    // then get fundraisers
    this.getMyFundraisers();
  }

  manageFundraiser() {
    this.router.navigateByUrl('/my-fundraiser-detail');
  }

  getUserId() {
   this.userId= this.activatedRoute.snapshot.paramMap.get('userId')??"";
    console.log(this.userId);
    
  }

  // get fundraisers of current user
  getMyFundraisers() {
    this.fundraiserServ.getMyFundraisers(this.userId).subscribe(
      fundraisers => {
        this.myFundraisers = fundraisers.fundraisers;
        console.log(this.myFundraisers);
        
      }
    )
  }

  createFundraiser() {
    this.router.navigateByUrl('/create');
  }
}
