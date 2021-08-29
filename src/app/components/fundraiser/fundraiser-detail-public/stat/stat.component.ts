import { Component, Input, OnInit } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from './../../../../services/fundraiser/fundraiser.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css'],
})
export class StatComponent implements OnInit {
  @Input() fundraiser!: Fundraiser;
  percentage = 0;
  constructor(
    private fundraiserService: FundraiserService
  ) {}

  ngOnInit(): void {
    this.percentage = this.fundraiserService.getPercentage(this.fundraiser);
  }
}
