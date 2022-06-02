import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { FundraiserPage } from 'src/app/models/fundraiser-page.model';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { Payment } from '../../models/payment.model';
import { User } from 'src/app/models/user.model';
import { CurrencyConverterService } from './../../../services/currency-converter/currency-converter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  loading: boolean = false;
  date_chosen: boolean = false;
  displayedColumns = [
    'firstName',
    'lastName',
    'bankName',
    'bankAccountNo',
    'amount',
    'fundraiserId',
  ];

  payments: Payment[] = [];

  errorMessage = '';
  currentPage = 0;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatPaginator) sort!: MatSort;

  //data source for the table
  dataSource = new MatTableDataSource<Payment>();

  @ViewChild('epltable', { static: false }) epltable?: ElementRef;
  fundraiserPage?: FundraiserPage;
  allFundraisers: Fundraiser[] = [];
  fundsWithFullData: Fundraiser[] = [];
  exchangeRate: number = 1;

  exchangeRateSubscription?: Subscription;

  constructor(
    private currencyConverterService: CurrencyConverterService,
    private cdr: ChangeDetectorRef,
    private pageTitle: Title,
    private fundraiserService: FundraiserService
  ) {}

  async ngOnInit() {
    this.pageTitle.setTitle('Admin | Export payments');
    // this.loading = true;

    // this.fundsWithFullData = await this.fundraiserService.getPaymentBirr();
    // console.log(this.fundsWithFullData);

    // // await this.getAllFundraisers();
    // // console.log(this.allFundraisers);
    // // await this.getFilteredFundraiserDetail();
    // // console.log(this.fundsWithFullData);
    // await this.activateTable();
    // this.loading = false;
  }

  // async getAllFundraisers() {
  //   do {
  //     await this.getFundraisers();
  //   } while (this.currentPage < this.fundraiserPage?.totalPages!);
  // }

  // //get fundraisers of a single page
  // async getFundraisers() {
  //   await this.fundraiserService.getFundraisersAsync(this.currentPage).then(
  //     (fundraiserPage: FundraiserPage) => {
  //       this.fundraiserPage = fundraiserPage;
  //       console.log(fundraiserPage.fundraisers);
  //       this.allFundraisers.push(...fundraiserPage.fundraisers);
  //       this.currentPage++;
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error.error);
  //       this.errorMessage = 'Unable to load fundraisers';
  //     }
  //   );
  // }

  // get fundraiser details
  // for those having donations
  // and totalRaised-totalWithdrawn>0,
  // and its withdrawal request is accepted
  // async getFilteredFundraiserDetail() {
  //   return new Promise(async (resolve) => {
  //     await this.allFundraisers.forEach(async (fund, index) => {
  //       await this.fundraiserService.getFundraiserAsync(fund._id!).then(
  //         (fundraiser) => {
  //           if (
  //             fundraiser.donations?.length! > 0 &&
  //             this.getTotalRaised(fundraiser) -
  //               this.getTotalWithdrawn(fundraiser) >
  //               0 &&
  //             fundraiser.withdraw?.status?.toLowerCase() === 'accepted'
  //           ) {
  //             this.fundsWithFullData.push(fundraiser);
  //           }
  //         },
  //         (error: HttpErrorResponse) => {
  //           console.log(error.error);
  //         }
  //       );
  //       if (index === this.allFundraisers.length - 1) {
  //         resolve(true);
  //         this.loading = false;
  //       }
  //     });
  //   });
  // }

  // add fundraiser data to payments array
  addToPayments(fundraiser: Fundraiser, isBirr: boolean) {
    let user: User = fundraiser.beneficiary
      ? fundraiser.beneficiary!
      : fundraiser.organizer!;
    let withdrawal = fundraiser.withdraw;

    let totalRaised = 0;
    let totalPayed = 0;
    if (isBirr) {
      totalRaised = fundraiser.totalRaised?.birr
        ? fundraiser.totalRaised?.birr
        : 0;
      totalPayed = fundraiser.totalPayed?.birr
        ? fundraiser.totalPayed?.birr
        : 0;
    } else {
      totalRaised = fundraiser.totalRaised?.dollar
        ? fundraiser.totalRaised?.dollar
        : 0;
      totalPayed = fundraiser.totalPayed?.dollar
        ? fundraiser.totalPayed?.dollar
        : 0;
    }

    let payment: Payment = {
      amount: totalRaised - totalPayed,
      // amount:
      //   this.getTotalRaised(fundraiser) - this.getTotalWithdrawn(fundraiser),
      firstName: user.firstName,
      lastName: user.lastName,
      fundraiserId: fundraiser._id!,
      bankAccountNo: withdrawal?.bankAccountNo!,
      bankName: withdrawal?.bankName!,
    };
    this.payments.push(payment);
  }

  // activate the data table
  activateTable(isBirr: boolean) {
    this.fundsWithFullData.forEach((fund) => {
      this.addToPayments(fund, isBirr);
    });
    console.log(this.payments);

    // assign the payments array to our data source
    this.dataSource.data = this.payments;
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  // // returns the total withdrawn amount of a fundraiser
  // getTotalWithdrawn(fundraiser: Fundraiser) {
  //   let total = 0;
  //   fundraiser.totalWithdraw?.forEach((withdrawal) => {
  //     if (withdrawal.amount) {
  //       total += withdrawal.amount;
  //     }
  //   });
  //   console.log(total);
  //   return total;
  // }

  // // returns the percentage of the total raised by this fundraiser to its goal
  // getPercentage(fund: Fundraiser): number {
  //   return (
  //     ((fund.totalRaised?.birr ??
  //       0 + (fund.totalRaised?.dollar ?? 0 * this.exchangeRate)) /
  //       fund.goalAmount!) *
  //     100
  //   );
  // }

  // // returns the total money raised by this fundraiser in birr
  // getTotalRaised(fund: Fundraiser): number {
  //   return (
  //     (fund.totalRaised?.birr ?? 0) +
  //     (fund.totalRaised?.dollar ?? 0) * this.exchangeRate
  //   );
  // }

  // async getExchangeRate() {
  //   this.exchangeRate = await this.currencyConverterService.getExchangeRate();
  // }

  async paymentInBirr() {
    this.payments = [];
    this.loading = true;

    this.fundsWithFullData = await this.fundraiserService.getPaymentBirr();
    console.log(this.fundsWithFullData);

    await this.activateTable(true);
    this.loading = false;
  }

  async paymentInDollar() {
    this.payments = [];
    this.loading = true;

    this.fundsWithFullData = await this.fundraiserService.getPaymentDollar();
    console.log(this.fundsWithFullData);

    await this.activateTable(false);
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.exchangeRateSubscription?.unsubscribe();
  }
}
