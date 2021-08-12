import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ShareDialogComponent } from '../../shared/share-dialog/share-dialog.component';
import { DoantionsComponent } from './doantions/doantions.component';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from './../../../services/fundraiser/fundraiser.service';
import { Donation } from 'src/app/models/donation.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-fudraiser-detail-public',
  templateUrl: './fudraiser-detail-public.component.html',
  styleUrls: ['./fudraiser-detail-public.component.css'],
})
export class FudraiserDetailPublicComponent implements OnInit {
  errorMessage = '';
  loading = true; // to show a loading spinner
  percentage = 0;

  fundraiserId: string = '';
  fundraiser?: Fundraiser;

  topDonation?: Donation;
  recentDonation?: Donation;
  firstDonation?: Donation;
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private docTitle: Title,
    public fundraiserServ: FundraiserService,
  ) {}

  ngOnInit(): void {
    this.docTitle.setTitle('fundraiser detail');
    // get the id parameter from router
    this.activatedRoute.paramMap.subscribe((params) => {
      this.fundraiserId = params.get('id') ?? '';
    });
    // get the fundraiser with this id
    this.getFundriser(this.fundraiserId);
  }

  // get fundriser using id
  getFundriser(fundriserId: string) {
    this.fundraiserServ.getFundraiser(fundriserId).subscribe(
      (fundraiser) => {
        this.fundraiser = fundraiser;
        this.loading = false;
        this.getFirstDonation();
        this.getTopDonation();
        this.getRecentDonation();
        this.percentage = this.fundraiserServ.getPercentage(this.fundraiser);
        console.log(this.fundraiser);
        console.log(
          this.fundraiserServ.hasAcceptedTeamMembers(this.fundraiser)
        );
      },
      (error) => {
        this.loading = false;
        console.log(error);
        this.errorMessage = 'Unable to get this fundriser';
      }
    );
  }

  // get the number of comments of thos fundraiser
  getNumberOfComments() {
    return this.fundraiserServ.getNumberOfComments(this.fundraiser!);
  }

  // get the first donation of this fundraiser
  getFirstDonation() {
    this.firstDonation = this.fundraiserServ.getFirstDonation(
      this.fundraiser?.donations!
    );
  }

  // checks if this fundraiser has team members that have a status not 'pending'
  hasAcceptedTeamMembers(): boolean {
    return this.fundraiserServ.hasAcceptedTeamMembers(this.fundraiser!);
  }

  // get top donation of this fundraiser
  getTopDonation() {
    this.topDonation = this.fundraiserServ.getTopDonation(
      this.fundraiser?.donations!
    );
  }
  // get recent donation of this fudraiser
  getRecentDonation() {
    this.recentDonation = this.fundraiserServ.getRecentDonation(
      this.fundraiser?.donations!
    );
  }

  share() {
    this.dialog
      .open(ShareDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }

  // open all donations dialog
  donations(type: string) {
    this.dialog
      .open(DoantionsComponent, {
        data: { type: type, fundraiser: this.fundraiser },
      })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }
}
