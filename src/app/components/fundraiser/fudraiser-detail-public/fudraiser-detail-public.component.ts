import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ShareDialogComponent } from '../../shared/share-dialog/share-dialog.component';
import { DoantionsComponent } from './doantions/doantions.component';
import { DonateComponent } from './../../donate/donate.component';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from './../../../services/fundraiser/fundraiser.service';

@Component({
  selector: 'app-fudraiser-detail-public',
  templateUrl: './fudraiser-detail-public.component.html',
  styleUrls: ['./fudraiser-detail-public.component.css'],
})
export class FudraiserDetailPublicComponent implements OnInit {
  fundraiserId: string ='';
  fundraiser?: Fundraiser;
  story =
    'The campaign is set up by friends of the Weinberger family. The campaign has been approved and overseen by Rabbi Baruch Hertz, Rabbi Baruch Epstein, and Rabbi Meir Moscowitz of Chicago, IL and funds are managed by the overseeing beneficiary Rabbi Yosef Assayag of Rabbanut, a 501c3 organization. Funds will be used to cover all costs associated with funeral expenses, loss of income, and all other related expenses the family will incur in relation to this tragedy.';
  update_text =
    'I’ve notified his parents and they’re been overwhelmed with all the support. This money is going to be directly deposited into his account. Thank you to anyone that donated or shared this post. A special thank you to the Seattle community for coming together and keeping the family close ♥️';
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private fundraiserServ: FundraiserService
  ) {}

  ngOnInit(): void {
    // get the id parameter from router
    this.activatedRoute.paramMap
    .subscribe((params) =>{this.fundraiserId=params.get('id')??""});
  //  get the fundraiser with this id
    this.getFundriser(this.fundraiserId);
    
  }

// get fundriser using id
  getFundriser(fundriserId:string) {
    this.fundraiserServ
      .getFundraiser(fundriserId)
      .subscribe((fundraiser) => (this.fundraiser = fundraiser));
  }


  share() {
    this.dialog
      .open(ShareDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }

  // open all donations dialog
  allDonations() {
    this.dialog
      .open(DoantionsComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }

  // open top donations dialog
  topDonations() {
    this.dialog
      .open(DonateComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }
}
