import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Donation, DonationInfo } from 'src/app/models/donation.model';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { DonationService } from 'src/app/services/donation/donation.service';

interface InputDatFormat {
  type: string;
  fundraiser: Fundraiser;
  exchangeRate: number;
  donationInfo: DonationInfo
}
@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss'],
})
export class DonationsComponent implements OnInit {
  donations!: Donation[];
  topDonations!: Donation[];
  type = ''; //to know top donations or all donations
  topButtonLabel = '';
  exchangeRate: number = 1;

  hasMoreDonations: boolean = true;
  donationPage: number = 1;
  topDonationPage: number = 1;

  constructor(
    private router: Router,
    private fundraiserService: FundraiserService,
    private dialogRef: MatDialogRef<DonationsComponent>,
    private donationService: DonationService,
    @Inject(MAT_DIALOG_DATA) public data: InputDatFormat
  ) { }

  ngOnInit(): void {
    this.type = this.data.type;
    this.donations = this.data.fundraiser.donations!;
    this.topButtonLabel = this.type === 'Top' ? 'All' : 'Top';
    this.exchangeRate = this.data.exchangeRate;
    this.topDonations = this.data.donationInfo.allTop!;
    if (this.donations.length == 0) {
      this.hasMoreDonations = false;
    }
  }
  // open the donation form

  toggleLabels() {
    this.type = this.type === 'Top' ? 'All' : 'Top';
    this.topButtonLabel = this.type === 'Top' ? 'All' : 'Top';
  }

  // get donations based on label
  getDonations() {
    this.toggleLabels();
    this.donations =
      this.type === 'Top'
        ? this.fundraiserService
          .sortDonationsByAmountDSC(this.data.fundraiser.donations!)
          .slice(0, 5)
        : this.data.fundraiser.donations!;
  }

  // returns donation amount for a donation in ETB
  getDonationAmount(donation: Donation): number {
    return donation.paymentMethod?.toLowerCase() === 'paypal'
      ? donation.amount * this.exchangeRate
      : donation.amount;
  }
  gotoDonatePage() {
    this.dialogRef.close();
    this.router.navigate(['/donate', this.data.fundraiser._id]);
  }

  async getMoreDonations() {
    if (this.type === 'All') {
      this.donationPage++;
      let donations = await this.donationService.getMoreDonations(this.data.fundraiser._id!, this.donationPage).toPromise();
      if (donations.length == 0 || this.donations.length > 50) {
        this.hasMoreDonations = false;
        return;
      }
      // for the viewport to detect changes and rerender
      this.donations = [...this.donations, ...donations];
    } else {
      this.topDonationPage++;
      let topDonations = await this.donationService.getMoreTopDonations(this.data.fundraiser._id!, this.topDonationPage).toPromise();
      if (topDonations.length == 0 || this.topDonations.length > 50) {
        this.hasMoreDonations = false;
        return;
      }
      // for the viewport to detect changes and rerender
      this.topDonations = [...this.topDonations, ...topDonations];
    }

  }
}
