import { Component, Input } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser.model';

@Component({
  selector: 'app-withdrawals-overview',
  templateUrl: './withdrawals-overview.component.html',
  styleUrls: ['./withdrawals-overview.component.css']
})
export class WithdrawalsOverviewComponent  {
  isOrganizer = false;
  @Input()fundraiser!: Fundraiser;
  constructor(
  ) {

    // this.fundraiser.
   }

 }
