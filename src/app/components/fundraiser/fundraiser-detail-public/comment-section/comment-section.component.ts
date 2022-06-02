import { Component, Input, OnInit } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { Donation, DonationInfo } from './../../../../models/donation.model';
import { DonationService } from 'src/app/services/donation/donation.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
})
export class CommentSectionComponent implements OnInit {
  @Input() fundraiser!: Fundraiser;
  @Input() exchangeRate!: number;
  @Input() donationInfo!: DonationInfo;

  hasMoreComments: boolean = true;
  commentPage: number = 1;

  donations: Donation[] = [];

  constructor(private fundraiserServ: FundraiserService,
    private donationService: DonationService) { }

  ngOnInit(): void {
    this.donations = this.donationInfo.all!;
    if (this.donations.length == 0) {
      this.hasMoreComments = false;
    }
  }

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

  // see more comments
  async getMoreComments() {
    this.commentPage++;
    let donations = await this.donationService.getMoreComments(this.fundraiser._id!, this.commentPage).toPromise();
    if (donations.length == 0 || this.donations.length > 50) {
      this.hasMoreComments = false;
      return;
    }
    this.donations.push(...donations);
  }
}
