import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';

@Component({
  selector: 'app-withdrawals',
  templateUrl: './withdrawals.component.html',
  styleUrls: ['./withdrawals.component.scss']
})
export class WithdrawalsComponent implements OnInit, OnDestroy {
  isOrganizer = false;

  fundraiserId: string = '';
  fundraiser!: Fundraiser;
  loading = false;
  errorMessage = '';


  tab: string = 'overview';// current tab

  // subscriptions
  fundraiserSub?: Subscription;
  activatedRouteSub?: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fundraiserServ: FundraiserService,
    private docTitle: Title
  ) { }

  ngOnInit(): void {
    this.docTitle.setTitle('Withdrawals | ' + this.tab);
    this.activatedRouteSub=this.activatedRoute.paramMap.subscribe(
      (param) => {
        // console.log(param.keys);
        // console.log(param);
        this.fundraiserId = param.get('id') || '';
        this.tab = param.get('tab') || '';
        this.getFundraiser();
      }
    );
  }

  // get fundraiser using id
  getFundraiser() {
    this.loading = true;
    this.fundraiserServ.getFundraiser(this.fundraiserId).subscribe(
      (fundraiser) => {
        this.fundraiser = fundraiser;
        this.loading = false;
        console.log(fundraiser);
      },
      
      (error) => {
        console.log(error);
        console.log(error.status);
        this.loading = false;
        this.errorMessage = navigator.onLine
          ? error.error
          : 'You are offline, please check your internet connection!';
      }
    );
  }


  ngOnDestroy(): void {
    this.fundraiserSub?.unsubscribe();
    this.activatedRouteSub?.unsubscribe();
  }
}
