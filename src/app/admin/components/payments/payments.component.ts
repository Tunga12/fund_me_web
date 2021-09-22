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

  constructor(
    private cdr: ChangeDetectorRef,
    private pageTitle: Title,
    private fundraiserService: FundraiserService
  ) {}

  async ngOnInit() {
    this.pageTitle.setTitle('Admin | payments to be exported');
    this.loading=true;
    await this.getAllFundraisers();
    console.log(this.allFundraisers);
    await this.getFilteredFundraiserDetail();
    console.log(this.fundsWithFullData);
    await this.activateTable();
    this.loading=false;
  }

  // // listen to event date range change from the date range selector
  // async dateRangeChange(
  //   dateRangeStart: HTMLInputElement,
  //   dateRangeEnd: HTMLInputElement
  // ) {
  //   this.payments=[];
  //   this.loading = true;
  //   this.date_chosen = true;

  // //   console.log(this.filterFundraisers(startDate, endDate));

  // // // filter fundraisers that have accepted withdrawal status and donations in the given date range
  // //   this.filterFundraisers(startDate, endDate).forEach((fund) =>
  // //     this.addToPayments(fund, startDate, endDate)
  // //   );

  //   console.log(this.payments);
  //   this.loading = false;

  //   // assign the payments array to our data source
  //   this.dataSource.data = this.payments;
  //   this.cdr.detectChanges();
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;

  //   console.log(this.dataSource.data);
  // }

  // get all available fundraisers
 

  // // filter fundraisers that have accepted withdrawal status and donations in the given date range
  // filterFundraisers(startDate: Date, endDate: Date) {
  //   let filteredFunds = this.fundsWithFullData.filter((fund) => {
  //     let donations = fund.donations?.filter((donation) => {
  //       let donationDate = new Date(donation.date!);
  //       return startDate <= donationDate && donationDate <= endDate;
  //     });
  //     return (
  //       fund.withdraw &&
  //       fund.withdraw.status?.toLocaleLowerCase() === 'accepted' &&
  //       donations!.length > 0
  //     );
  //   });
  //   return filteredFunds;
  // }

  // // get the total donation amount for each a fundraiser in the given date range
  // getTotalDonationAmount(
  //   fundraiser: Fundraiser,
  //   startDate: Date,
  //   endDate: Date
  // ) {
  //   let total = 0;
  //   let donations = fundraiser.donations?.filter((donation) => {
  //     let donationDate = new Date(donation.date!);
  //     return startDate <= donationDate && donationDate <= endDate;
  //   });

  //   donations?.forEach((donation) => {
  //     total += donation.amount;
  //   });
  //   return total;
  // }


  async getAllFundraisers() {
    do {
      await this.getFundraisers();
    } while (this.currentPage < this.fundraiserPage?.totalPages!);
  }

  //get fundraisers of a single page
  async getFundraisers() {
    await this.fundraiserService.getFundraisersAsync(this.currentPage).then(
      (fundraiserPage: FundraiserPage) => {
        this.fundraiserPage = fundraiserPage;
        console.log(fundraiserPage.fundraisers);
        this.allFundraisers.push(...fundraiserPage.fundraisers);
        this.loading = false;
        this.currentPage++;
      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        this.errorMessage = 'Unable to load fundraisers';
      }
    );
  }

  // get fundraiser details for those having donations and totalRaised-totalWithdrawn>0
  async getFilteredFundraiserDetail() {
    return new Promise(async resolve=>{
      await this.allFundraisers.forEach(async (fund,index) => {
      await this.fundraiserService.getFundraiserAsync(fund._id!).then(
        (fundraiser) => {
          if (
            fundraiser.donations?.length! > 0 &&
            (fundraiser.totalRaised!- this.getTotalWithdrawn(fundraiser) > 0)
          ) {
            this.fundsWithFullData.push(fundraiser);
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      );
      if (index===this.allFundraisers.length-1) {
        resolve(true);
      }
    });
  });
}


  // add fundraiser data to payments array
  addToPayments(fundraiser: Fundraiser) {
    let user: User = fundraiser.beneficiary
      ? fundraiser.beneficiary!
      : fundraiser.organizer!;
    let withdrawal = fundraiser.withdraw;
    let payment: Payment = {
      amount: fundraiser.totalRaised! - this.getTotalWithdrawn(fundraiser),
      firstName: user.firstName,
      lastName: user.lastName,
      fundraiserId: fundraiser._id!,
      bankAccountNo: withdrawal?.bankAccountNo!,
      bankName: withdrawal?.bankName!,
    };
    this.payments.push(payment);
  }

  // activate the data table
  activateTable() {
    this.fundsWithFullData.forEach((fund) => {
      this.addToPayments(fund);
    });
    console.log(this.payments);
    
    // assign the payments array to our data source
    this.dataSource.data = this.payments;
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // returns the total withdrawn amount of a fundraiser
  getTotalWithdrawn(fundraiser: Fundraiser) {
    let total = 0;
    fundraiser.totalWithdraw?.forEach((withdrawal) => {
      if (withdrawal.amount) {
        total += withdrawal.amount;
      }
    });
    console.log(total);
    return total;
  }
}
