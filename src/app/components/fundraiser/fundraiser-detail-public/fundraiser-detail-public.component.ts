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
import { SnackbarService } from './../../../services/snackbar/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { ReportReasonTypesService } from 'src/app/services/report-reason-types/report-reason-types.service';
import { ReportReasonType } from 'src/app/admin/models/report-reason-type.model';
import { CurrencyConverterService } from './../../../services/currency-converter/currency-converter.service';

@Component({
  selector: 'app-fundraiser-detail-public',
  templateUrl: './fundraiser-detail-public.component.html',
  styleUrls: ['./fundraiser-detail-public.component.scss'],
})
export class FundraiserDetailPublicComponent implements OnInit, OnDestroy {
  userId = localStorage.getItem('userId') || '';

  reasonsList: ReportReasonType[] = [];


  user!: User;
  errorMessage = '';
  loading = true; // to show a loading spinner
  // percentage = 0;
  // totalRaised=0;
  fundraiserId: string = '';
  fundraiser?: Fundraiser;

  fundSub?: Subscription;
  userSub?: Subscription;
  reasonSub?: Subscription;
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private docTitle: Title,
    private reasonsService: ReportReasonTypesService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private snackbarService: SnackbarService,
    public fundraiserService: FundraiserService,
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
    this.getFundraiser(this.fundraiserId);

    // get current user
    this.getUser();

    // get all reasons
    this.getReportReasons();
  }

  // get current user to know admin or not
  getUser() {
    this.userSub = this.userService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
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

    // this.fundSub = this.fundraiserService
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

  // get fundraiser using id
  getFundraiser(fundraiserId: string) {
    let ref; // id for the user who shared this fundraiser
    this.fundSub = this.fundraiserService.getFundraiser(fundraiserId).subscribe(
      (fundraiser) => {
        this.fundraiser = fundraiser;
        this.loading = false;


        console.log(this.fundraiser);
        console.log(
          this.fundraiserService.hasAcceptedTeamMembers(this.fundraiser)
        );

        console.log(fundraiser);

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
        this.errorMessage = 'Unable to get this fundraiser';
      }
    );
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

  // checks if this fundraiser has team members that have a status not 'pending'
  hasAcceptedTeamMembers(): boolean {
    return this.fundraiserService.hasAcceptedTeamMembers(this.fundraiser!);
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
  openReportDialog() {
    this.dialog.open(ReportDialogComponent, {
      data: { fundraiserId: this.fundraiserId, reasons: this.reasonsList },
    });
  }

  // get all report reason types
  getReportReasons() {
    this.reasonSub = this.reasonsService
      .getReportReasonTypes()
      .subscribe((reasons) => {
        this.reasonsList = reasons;
      });
  }

 

  ngOnDestroy(): void {
    this.fundSub?.unsubscribe();
    this.userSub?.unsubscribe();
  }
}
