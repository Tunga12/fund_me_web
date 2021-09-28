import { Component, Input, OnInit } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { Donation } from './../../../../models/donation.model';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
})
export class CommentSectionComponent implements OnInit {
  @Input() fundraiser!: Fundraiser;
  @Input() exchangeRate!: number;

  constructor(private fundraiserServ: FundraiserService) {}

  ngOnInit(): void {}

  // get the number of comments of this fundraiser
  getNumberOfComments() {
    return this.fundraiserServ.getNumberOfComments(this.fundraiser!);
  }

  // returns donation amount for a donation in ETB
  getDonationAmount(donation: Donation): number {
    return donation.paymentMethod?.toLowerCase() === 'paypal'
      ? donation.amount * this.exchangeRate
      : donation.amount;
  }
}
