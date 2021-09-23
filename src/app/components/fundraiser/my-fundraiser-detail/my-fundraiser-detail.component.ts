import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { ShareArgs } from 'src/app/models/share-buttons-args';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';

import { PostAnUpdateComponent } from '../../post-an-update/post-an-update.component';
import { ShareDialogComponent } from '../../share-dialog/share-dialog.component';
import { Update } from './../../../models/update.model';
import { CurrencyConverterService } from './../../../services/currency-converter/currency-converter.service';

@Component({
  selector: 'app-detail',
  templateUrl: './my-fundraiser-detail.component.html',
  styleUrls: ['./my-fundraiser-detail.component.scss'],
})
export class MyFundraiserDetailComponent implements OnInit, OnDestroy {
  userId = localStorage.getItem('userId');
  tabs = [1, 2, 3];
  update!: Update;

  fundraiserId: string = '';
  fundraiser!: Fundraiser;
  loading = false;
  errorMessage = '';

  // subscriptions
  fundraiserSub?: Subscription;
  exchangeRate: number = 1;
  exchangeRateSubscription?: Subscription;

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private fundraiserServ: FundraiserService,
    private docTitle: Title,
    private router: Router,
    private currencyConverterService: CurrencyConverterService
  ) {}

  ngOnInit(): void {
    this.docTitle.setTitle('Manage fundraiser');
    // get the id parameter from router
    this.fundraiserId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.getFundraiser();
    this.getExchangeRate();
  }

  // get fundraiser using id
  getFundraiser() {
    this.loading = true;
    this.fundraiserServ.getFundraiser(this.fundraiserId).subscribe(
      (fundraiser) => {
        this.fundraiser = fundraiser;
        this.loading = false;
        console.log(fundraiser);
      },
      (error) => {
        console.log(error);
        console.log(error.status);
        this.loading = false;
        this.errorMessage = navigator.onLine
          ? error.error
          : 'You are offline, please check your internet connection!';
      }
    );
  }

  isOrganizer() {
    return this.fundraiser.organizer?._id === this.userId;
  }

  isBeneficiary() {
    return this.fundraiser?.beneficiary?._id === this.userId;
  }

  withdrawal(id: string) {
    {
      this.fundraiser.withdraw
        ? this.router.navigate(['/my-fundraiser/withdrawals/', id, 'overview'])
        : this.router.navigate(['/withdrawal', id]);
    }
  }

  //  open dialog for update
  openUpdateDialog() {
    this.dialog.open(PostAnUpdateComponent, {
      data: { mode: 'Post', update: this.update, fundraiser: this.fundraiser },
    });
  }

  openShareDialog() {
    let data: ShareArgs = {
      url: `http://legas.highlight-group.com/fundraiser-detail/${this.fundraiser?._id}?ref=${this.userId}`,
      image: this.fundraiser?.image,
      title: this.fundraiser?.title,
      description: `Hi, I have created a fundraiser on legas ${
        this.fundraiser?.beneficiary
          ? 'to help' + this.fundraiser.beneficiary.firstName
          : ''
      } please signup and help me by donating and sharing it to your friends. thanks!`,
    };
    this.dialog.open(ShareDialogComponent, {
      data: data,
    });
  }

  // returns the percentage of the total raised by this fundraiser to its goal
  getPercentage(fund: Fundraiser): number {
    return (
      ((fund.totalRaised?.birr ??
        0 + (fund.totalRaised?.dollar ?? 0 * this.exchangeRate)) /
        fund.goalAmount!) *
      100
    );
  }

  // returns the total money raised by this fundraiser in birr
  getTotalRaised(fund: Fundraiser): number {
    return (
      fund.totalRaised?.birr ??
      0 + (fund.totalRaised?.dollar ?? 0 * this.exchangeRate)
    );
  }

  getExchangeRate() {
    this.exchangeRateSubscription = this.currencyConverterService
      .getExchangeRate()
      .subscribe(
        (rate) => {
          this.exchangeRate = rate;
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      );
  }

  ngOnDestroy(): void {
    this.fundraiserSub?.unsubscribe();
    this.exchangeRateSubscription?.unsubscribe();
  }
}
