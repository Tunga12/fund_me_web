import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { ShareArgs } from 'src/app/models/share-buttons-args';

import { ShareDialogComponent } from '../../share-dialog/share-dialog.component';
import { AuthService } from '../../../services/auth/auth.service';
import { FundraiserService } from '../../../services/fundraiser/fundraiser.service';
import { DonationsComponent } from './donations/donations.component';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';

@Component({
  selector: 'app-fundraiser-detail-public',
  templateUrl: './fundraiser-detail-public.component.html',
  styleUrls: ['./fundraiser-detail-public.component.css'],
})
export class FundraiserDetailPublicComponent implements OnInit, OnDestroy {
  userId = localStorage.getItem('userId') || '';

  errorMessage = '';
  loading = true; // to show a loading spinner
  percentage = 0;

  fundraiserId: string = '';
  fundraiser?: Fundraiser;



  fundSub?: Subscription;
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private docTitle: Title,
    public fundraiserServ: FundraiserService,
    public authService: AuthService
  ) {}

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
    let fundraiser = {
      ...this.fundraiser,
      category: this.fundraiser?.category?._id,
      organizer: this.fundraiser?.organizer?._id,
    };
    let fundraiserId = this.fundraiser?._id!;
    // remove the unnecessary elements: not needed for update
    delete fundraiser._id;
    delete fundraiser.__v;
    delete fundraiser.beneficiary;

    // this.fundSub = this.fundraiserServ
    //   .editFundraiser(fundraiserId, fundraiser)
    //   .subscribe(
    //     () => {
    //       this.loading = false;
    //     },
    //     () => {
    //       this.loading = false;
    //     }
    //   );
  }

  // get fundriser using id
  getFundriser(fundriserId: string) {
    let ref; // id for the user who shared this fundraiser
    this.fundSub = this.fundraiserServ.getFundraiser(fundriserId).subscribe(
      (fundraiser) => {
        this.fundraiser = fundraiser;
        this.loading = false;
     
        this.percentage = this.fundraiserServ.getPercentage(this.fundraiser);
        console.log(this.fundraiser);
        console.log(
          this.fundraiserServ.hasAcceptedTeamMembers(this.fundraiser)
        );

        // if there is a referer id increase share count
        this.activatedRoute.queryParams.subscribe((qParams) => {
          ref = qParams['ref'] || '';
          if (ref && ref !== this.userId) {
            this.increaseShareCount();
          }
        });
      },
      (error) => {
        this.loading = false;
        console.log(error);
        this.errorMessage = 'Unable to get this fundriser';
      }
    );
  }

  share() {
    let data: ShareArgs = {
      url: `https://localhost:4200/fundraiser-detail/${this.fundraiser?._id}?ref=${this.userId}`,
      image: this.fundraiser?.image,
      title: this.fundraiser?.title,
      description: `Hi, I havae created a fundraiser on gofundme ${
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
 
  
  // checks if this fundraiser has team members that have a status not 'pending'
  hasAcceptedTeamMembers(): boolean {
    return this.fundraiserServ.hasAcceptedTeamMembers(this.fundraiser!);
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

  // opens the report fundraiser dialog
  openReportDialog(){
    this.dialog.open(
      ReportDialogComponent,{data:{fundraiserId:this.fundraiserId}}
    );
  }


  ngOnDestroy(): void {
    this.fundSub?.unsubscribe();
  }
}
