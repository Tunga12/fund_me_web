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
export class StatComponent implements OnInit,OnDestroy {
  @Input() fundraiser!: Fundraiser;
  percentage = 0;
  currencyConversionRate: number = 1;
  totalRaised: number = 0;

  // subscriptions
  currencySub?:Subscription;
  constructor(private currencyConvServ: CurrencyConverterService) {}

  ngOnInit(): void {
    this.getConversionRate();
  }

  // get currency conversion rate
  getConversionRate() {
    this.currencySub = this.currencyConvServ.getExchangeRate().subscribe(
      (rate) => {
        this.currencyConversionRate = rate;
        //  total money raised by this fundraiser
        this.totalRaised =
          this.fundraiser.totalRaised?.birr ??
          0 +
            (this.fundraiser.totalRaised?.dollar ??
              0 * this.currencyConversionRate);

        // percentage of money raised to fundraiser goal amount
        this.percentage =
          (this.totalRaised / this.fundraiser.goalAmount!) * 100;
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    );
  }
  ngOnDestroy(){
    this.currencySub?.unsubscribe();
  }
}
