import { Component, Input, OnInit } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser.model';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss'],
})
export class StatComponent implements OnInit {
  @Input() fundraiser!: Fundraiser;
  percentage = 0;
  @Input() exchangeRate!: number;
  totalRaised: number = 0;

  ngOnInit(): void {
    this.getTotalRaisedInBirr();
    this.getPercentage();
  }
  //  total money raised by this fundraiser
  getTotalRaisedInBirr() {
    this.totalRaised =
      this.fundraiser.totalRaised?.birr! +
      this.fundraiser.totalRaised?.dollar! * this.exchangeRate;
  }

  // percentage of money raised to fundraiser goal amount
  getPercentage() {
    this.percentage = (this.totalRaised / this.fundraiser.goalAmount!) * 100;
  }
}
