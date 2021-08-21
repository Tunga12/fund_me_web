import { Component, Input } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser.model';

@Component({
  selector: 'app-withdrawals-history',
  templateUrl: './withdrawals-history.component.html',
  styleUrls: ['./withdrawals-history.component.css']
})
export class WithdrawalsHistoryComponent {
  isOrganizer = false;
  @Input()fundraiser!: Fundraiser;
  constructor(
  ) { }

 }