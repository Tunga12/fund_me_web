import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Donation } from 'src/app/models/donation.model';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { ShareArgs } from 'src/app/models/share-buttons-args';

import { ShareDialogComponent } from '../../share-dialog/share-dialog.component';
import { AuthService } from './../../../services/auth/auth.service';
import { FundraiserService } from './../../../services/fundraiser/fundraiser.service';
import { DonationsComponent } from './doantions/doantions.component';

@Component({
  selector: 'app-fudraiser-detail-public',
  templateUrl: './fudraiser-detail-public.component.html',
  styleUrls: ['./fudraiser-detail-public.component.css'],
})
export class FudraiserDetailPublicComponent implements OnInit, OnDestroy {
  userId = localStorage.getItem('userId') || '';

  errorMessage = '';
  loading = true; // to show a loading spinner
  percentage = 0;

  fundraiserId: string = '';
  fundraiser?: Fundraiser;

  topDonation?: Donation;
  recentDonation?: Donation;
  firstDonation?: Donation;

  fundSub?: Subscription;
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private docTitle: Title,
    public fundraiserServ: FundraiserService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.docTitle.setTitle('fundraiser detail');
    // get the id parameter from router
    this.activatedRoute.paramMap.subscribe((params) => {
      this.fundraiserId = params.get('id') ?? '';

      // console.log(this.fundraiserId)
    });

    // get the fundraiser with this id
    this.getFundriser(this.fundraiserId);
  }

  increaseShareCount() {
    this.loading = true;
    this.fundraiser!.totalShareCount = this.fundraiser?.totalShareCount! + 1;
    this.fundSub = this.fundraiserServ.editFundraiser(this.fundraiser!).subscribe(
      () => {
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  // get fundriser using id
  getFundriser(fundriserId: string) {
    let ref;// id for the user who shared this fundraiser
    this.fundSub = this.fundraiserServ.getFundraiser(fundriserId).subscribe(
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

        // if there is a referer id increase share count
        this.activatedRoute.queryParams.subscribe(
          (qParams) => {
            ref = qParams['ref'] || '';
            if (ref && ref!==this.userId) {
              this.increaseShareCount();
            }
          }
        )
      },
      (error) => {
        this.loading = false;
        console.log(error);
        this.errorMessage = 'Unable to get this fundriser';
      }
    );
  }

  // check if the current user has donated to this fundraiser
  hasDonated(): boolean {
    return this.fundraiserServ.hasDonated(this.fundraiser!, this.userId);
  }

  // get the donation amount I made to a fundraiser
  getMyDonationAmount(): number {
    return this.fundraiserServ.myDonation(this.fundraiser!, this.userId);
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
    let data: ShareArgs = {
      url: `http://localhost:4200/fundraiser-detail/${this.fundraiser?._id}?ref=${this.userId}`,
      image: this.fundraiser?.image,
      title: this.fundraiser?.title,
      description: `Hi, I havae created a fundraiser on gofundme ${this.fundraiser?.beneficiary ? 'to help' + this.fundraiser.beneficiary.firstName : ''} please signup and help me by donating and sharing it to your friends. thanks!`
    };
    this.dialog
      .open(ShareDialogComponent,
        {
          data: data
        }
      )
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }

  // open all donations dialog
  donations(type: string) {
    this.dialog
      .open(DonationsComponent, {
        data: { type: type, fundraiser: this.fundraiser },
      })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }

  ngOnDestroy(): void {
    this.fundSub?.unsubscribe()
  }

}
