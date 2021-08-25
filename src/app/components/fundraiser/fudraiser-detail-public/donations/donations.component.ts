import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Donation } from 'src/app/models/donation.model';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';

interface InputDatFormat {
  type: string;
  fundraiser: Fundraiser;
}
@Component({
  selector: 'app-doantions',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css'],
})
export class DonationsComponent implements OnInit {
  donations!: Donation[];
  type = ''; //to know top donations or all donations
  topButtonLabel = '';
  constructor(
    private router: Router,
    private fundariserService: FundraiserService,
    @Inject(MAT_DIALOG_DATA) public data: InputDatFormat
  ) {}

  ngOnInit(): void {
    this.type = this.data.type;
    this.donations = this.data.fundraiser.donations!;
    this.topButtonLabel = this.type === 'Top' ? 'All' : 'Top';
  }
  // open the donation form

  toggleLabels() {
    this.type = this.type === 'Top' ? 'All' : 'Top';
    this.topButtonLabel = this.type === 'Top' ? 'All' : 'Top';
  }

  getDonations() {
    this.toggleLabels();
    this.donations =
      this.type === 'Top'
        ? this.fundariserService
            .sortDonationsByAmountDSC(this.data.fundraiser.donations!)
            .slice(0, 5)
        : this.data.fundraiser.donations!;
  }

  gotoDonatePage() {
    this.router.navigate(['/donate', this.data.fundraiser._id]);
  }
}
