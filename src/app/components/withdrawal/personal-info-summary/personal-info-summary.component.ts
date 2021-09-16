import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';

@Component({
  selector: 'app-personal-info-summary',
  templateUrl: './personal-info-summary.component.html',
  styleUrls: ['./personal-info-summary.component.scss'],
})
export class PersonalInfoSummaryComponent implements OnInit {

  fundId = '';// fundraiser id
  fundraiser?: Fundraiser;

  // 
  loading = false;
  errorMessage = '';

  // subscriptions
  fundraiserSub?: Subscription;
  routSUb?: Subscription;
  constructor(private router: Router,
    private fundraiserService: FundraiserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routSUb = this.activatedRoute.paramMap.subscribe(
      (param) => {
        this.fundId = param.get('id') || '';
        this.getFundraiser();
      }
    )
  }

  editInfo() {
    this.router.navigate(['/withdrawal/personal-info', this.fundId]);
  }

  // get the current fundraiser
  getFundraiser() {
    this.loading = true;
    this.fundraiserSub = this.fundraiserService
      .getFundraiser(this.fundId)
      .subscribe(
        (fund: Fundraiser) => {
          this.fundraiser = fund;
          this.loading = false;
          // if this fundraiser has a withdrawal info linked, show it

        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          console.log('Error wihle getting fundraiser:', error.error);
          this.errorMessage = error.error;
        }
      );
  }

}
