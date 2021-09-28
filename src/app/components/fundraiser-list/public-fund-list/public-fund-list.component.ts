import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CurrencyConverterService } from 'src/app/services/currency-converter/currency-converter.service';

@Component({
  selector: 'app-public-fund-list',
  templateUrl: './public-fund-list.component.html',
  styleUrls: ['./public-fund-list.component.scss'],
})
export class PublicFundListComponent implements OnInit, OnDestroy {
  @Input() fundraisers!: Fundraiser[];
  @Input() loading!: boolean;
  @Input() hasNext!: boolean;
  @Output() nextEvent = new EventEmitter();
  
  exchangeRate: number = 1;

  exchangeRateSubscription?: Subscription;
  constructor(
    private currencyConverterService: CurrencyConverterService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.getExchangeRate();
  }

  // returns the percentage of the total raised by this fundraiser to its goal
  getPercentage(fund: Fundraiser): number {
    return (
      ((fund.totalRaised?.birr!+ (fund.totalRaised?.dollar! * this.exchangeRate)) /
        fund.goalAmount!) *
      100
    );
  }

  // returns the total money raised by this fundraiser in birr
  getTotalRaised(fund: Fundraiser): number {
    return (
      fund.totalRaised?.birr!+ (fund.totalRaised?.dollar! * this.exchangeRate)
    );
  }

  nextPage() {
    this.nextEvent.emit();
  }

  // get the current exchange rate(USD->ETB)
  getExchangeRate() {
    this.exchangeRateSubscription = this.currencyConverterService
      .getExchangeRate()
      .subscribe(
        (rate) => {
          if (rate) {
            this.exchangeRate = rate.USD_ETB;
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      );
  }

  ngOnDestroy() {
    this.exchangeRateSubscription?.unsubscribe();
  }
}
