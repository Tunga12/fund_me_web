import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { Subscription } from 'rxjs';
import { CurrencyConverterService } from 'src/app/services/currency-converter/currency-converter.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss'],
})
export class StatComponent implements OnInit {
  @Input() fundraiser!: Fundraiser;
  percentage = 0;
  exchangeRate: number = 1;
  totalRaised: number = 0;
  currencySub?: Subscription;

  constructor(private currencyConvServ: CurrencyConverterService) {}

  ngOnInit(): void {
    this.getConversionRate();
  }
  //  total money raised by this fundraiser
  getTotalRaisedInBirr() {
    this.totalRaised =
      this.fundraiser.totalRaised?.birr! +
      this.fundraiser.totalRaised?.dollar! * this.exchangeRate;
  }

  // get currency conversion rate
  getConversionRate() {
    this.currencySub = this.currencyConvServ.getExchangeRate().subscribe(
      (rate) => {
        if (rate) {
          this.exchangeRate = rate.USD_ETB;
          console.log(rate);
        }
        this.getTotalRaisedInBirr();
        this.getPercentage();
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    );
  }

  // percentage of money raised to fundraiser goal amount
  getPercentage() {
    this.percentage = (this.totalRaised / this.fundraiser.goalAmount!) * 100;
  }
}
