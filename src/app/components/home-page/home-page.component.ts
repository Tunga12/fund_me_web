import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { HomeFundraiser } from 'src/app/models/home-fundraiser.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  fundraisers: Fundraiser[] = [];
  fundraiserSub?: Subscription;


  constructor(
    private fundraiserService: FundraiserService,
  ) {}

  ngOnInit(): void {
    this.getFundraisers();
  }

  //get fundrisers of the first page
  getFundraisers() {
    this.fundraiserSub = this.fundraiserService
      .getFundraisers()
      .subscribe((fundraiser: HomeFundraiser) => {
        this.fundraisers = [...this.fundraisers, ...fundraiser.fundraisers];
      });
  }



  // unsubscribe if from all subscriptions
  ngOnDestroy(): void {
    if (this.fundraiserSub) this.fundraiserSub.unsubscribe();
  }
}
