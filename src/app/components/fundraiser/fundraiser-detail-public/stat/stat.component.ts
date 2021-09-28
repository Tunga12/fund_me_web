import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { CurrencyConverterService } from 'src/app/services/currency-converter/currency-converter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss'],
})
export class StatComponent implements OnInit, OnDestroy {
  @Input() fundraiser!: Fundraiser;
  percentage = 0;
  currencyConversionRate: number = 1;
  totalRaised: number = 0;

  // subscriptions
  currencySub?: Subscription;
  constructor(private currencyConvServ: CurrencyConverterService) {}

  ngOnInit(): void {
    this.getConversionRate();
  }

  // get currency conversion rate
  getConversionRate() {
    this.currencySub = this.currencyConvServ.getExchangeRate().subscribe(
      (rate) => {
        if (rate) {
          this.currencyConversionRate = rate.USD_ETB;
        }
        this.getTotalRRaisedInBirr();
        this.getPercentage();
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    );
  }

  //  total money raised by this fundraiser
  getTotalRRaisedInBirr() {
    this.totalRaised =
      this.fundraiser.totalRaised?.birr! +
      this.fundraiser.totalRaised?.dollar! * this.currencyConversionRate;
  }

  // percentage of money raised to fundraiser goal amount
  getPercentage() {
    this.percentage = (this.totalRaised / this.fundraiser.goalAmount!) * 100;
  }

  ngOnDestroy() {
    this.currencySub?.unsubscribe();
  }
}
