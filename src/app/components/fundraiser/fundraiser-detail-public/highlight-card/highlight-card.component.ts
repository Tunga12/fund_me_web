import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ShareDialogComponent } from 'src/app/components/share-dialog/share-dialog.component';
import { Donation } from 'src/app/models/donation.model';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { ShareArgs } from 'src/app/models/share-buttons-args';
import { CurrencyConverterService } from 'src/app/services/currency-converter/currency-converter.service';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { DonationsComponent } from '../donations/donations.component';

@Component({
  selector: 'app-highlight-card',
  templateUrl: './highlight-card.component.html',
  styleUrls: ['./highlight-card.component.scss'],
})
export class HighlightCardComponent implements OnInit {
  userId = localStorage.getItem('userId') || '';
  @Input() fundraiser!: Fundraiser;
  @Input() exchangeRate!:number;

  topDonation?: Donation;
  recentDonation?: Donation;
  firstDonation?: Donation;


  constructor(
    private fundraiserServ: FundraiserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getFirstDonation();
    this.getTopDonation();
    this.getRecentDonation();
     }

  // returns donation amount in birr
  getDonationAmountInBirr(donation: Donation) {
        return donation.paymentMethod.toLowerCase() === 'paypal'
      ? donation.amount * this.exchangeRate
      : donation.amount;
  }

  // // check if the current user has donated to this fundraiser
  // hasDonated(): boolean {
  //   return this.fundraiserServ.hasDonated(this.fundraiser!, this.userId);
  // }

  // // get the donation amount I made to a fundraiser
  // getMyDonationAmount(): number {
  //   return this.fundraiserServ.myDonation(this.fundraiser!, this.userId);
  // }

  // get the first donation of this fundraiser
  getFirstDonation() {
    this.firstDonation = this.fundraiserServ.getFirstDonation(
      this.fundraiser?.donations!
    );
  }

  // get top donation of this fundraiser
  getTopDonation() {
    this.topDonation = this.fundraiserServ.getTopDonation(
      this.fundraiser?.donations!
    );
  }
  // get recent donation of this fundraiser
  getRecentDonation() {
    this.recentDonation = this.fundraiserServ.getRecentDonation(
      this.fundraiser?.donations!
    );
  }

  // open all donations dialog
  donations(type: string) {
    this.dialog
      .open(DonationsComponent, {
        data: { type: type, fundraiser: this.fundraiser,exchangeRate:this.exchangeRate },
      })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }

  share() {
    let data: ShareArgs = {
      url: `https://legas.highlight-group.com/fundraiser-detail/${this.fundraiser?._id}?ref=${this.userId}`,
      image: this.fundraiser?.image,
      title: this.fundraiser?.title,
      description: `Hi, I have created a fundraiser on legas ${
        this.fundraiser?.beneficiary
          ? 'to help' + this.fundraiser.beneficiary.firstName
          : ''
      } please signup and help me by donating and sharing it to your friends. thanks!`,
    };
    this.dialog
      .open(ShareDialogComponent, {
        data: data,
      })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }
}
