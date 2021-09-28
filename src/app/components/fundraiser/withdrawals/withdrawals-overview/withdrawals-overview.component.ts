import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { CurrencyConverterService } from './../../../../services/currency-converter/currency-converter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-withdrawals-overview',
  templateUrl: './withdrawals-overview.component.html',
  styleUrls: ['./withdrawals-overview.component.scss'],
})
export class WithdrawalsOverviewComponent implements OnInit, OnDestroy {
  isOrganizer = false;
  @Input() fundraiser!: Fundraiser;
  exchangeRate: number = 1;
  exchangeRateSubscription?: Subscription;
  constructor(private currencyConverterService: CurrencyConverterService) {}
  ngOnDestroy(): void {
    this.exchangeRateSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.getExchangeRate();
  }

  // returns the percentage of the total raised by this fundraiser to its goal
  getPercentage(fund: Fundraiser): number {
    return (
      ((fund.totalRaised?.birr ??
        0 + (fund.totalRaised?.dollar ?? 0 * this.exchangeRate)) /
        fund.goalAmount!) *
      100
    );
  }

  // returns the total money raised by this fundraiser in birr
  getTotalRaised(fund: Fundraiser): number {
    return (
      fund.totalRaised?.birr ??
      0 + (fund.totalRaised?.dollar ?? 0 * this.exchangeRate)
    );
  }

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
}
