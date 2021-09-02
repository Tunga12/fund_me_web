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
import { ExcelService } from './../../services/excel/excel.service';
@Component({
  selector: 'admin-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
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

  //datasource for the table
  dataSource = new MatTableDataSource<Payment>();

  @ViewChild('epltable', { static: false }) epltable?: ElementRef;
  fundraiserPage?: FundraiserPage;
  allFundraisers: Fundraiser[] = [];
  fundsWithFullData: Fundraiser[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private pageTitle: Title,
    private fundraiserService: FundraiserService,
    private excelSrv:ExcelService
  ) {}

  async ngOnInit() {
    this.pageTitle.setTitle('Admin | payments');
    await this.getAllFundraisers();
    console.log(this.allFundraisers);
    this.getFilteredFundraiserDetail();
  }

  // listen to event date range change from the date range selector
  async dateRangeChange(
    dateRangeStart: HTMLInputElement,
    dateRangeEnd: HTMLInputElement
  ) {
    this.payments=[];
    this.loading = true;
    this.date_chosen = true;
    let startDate = new Date(dateRangeStart.value);
    let endDate = new Date(dateRangeEnd.value);

    console.log(this.filterFundraisers(startDate, endDate));

  // filter fundaisers that have accepted withdrawal status and donations in the given date range
    this.filterFundraisers(startDate, endDate).forEach((fund) =>
      this.addToPayments(fund, startDate, endDate)
    );
    
    console.log(this.payments);
    this.loading = false;

    // assign the payments array to our datasource
    this.dataSource.data = this.payments;
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    console.log(this.dataSource.data);
  }

  // get all available fundraisers
  async getAllFundraisers() {
    do {
      await this.getFundraisers();
    } while (this.currentPage < this.fundraiserPage?.totalPages!);
  }

  //get fundraisers of a single page
  async getFundraisers() {
    this.loading = true;
    await this.fundraiserService.getFundraisersAsync(this.currentPage).then(
      (fundraiserPage: FundraiserPage) => {
        this.fundraiserPage = fundraiserPage;
        console.log(fundraiserPage.fundraisers);
        this.allFundraisers.push(...fundraiserPage.fundraisers);
        this.loading = false;
        this.currentPage++;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        console.log(error.error);
        this.errorMessage = 'Unable to load fundraisers';
      }
    );
  }

  // filter fundaisers that have accepted withdrawal status and donations in the given date range
  filterFundraisers(startDate: Date, endDate: Date) {
    let filteredFunds = this.fundsWithFullData.filter((fund) => {
      let donations = fund.donations?.filter((donation) => {
        let donationDate = new Date(donation.date!);
        return startDate <= donationDate && donationDate <= endDate;
      });
      return (
        fund.withdraw &&
        fund.withdraw.status?.toLocaleLowerCase() === 'accepted' &&
        donations!.length > 0
      );
    });
    return filteredFunds;
  }

  // add fundraiser data to payments array
  addToPayments(fundraiser: Fundraiser, startDate: Date, endDate: Date) {
    let user: User = fundraiser.beneficiary
      ? fundraiser.beneficiary!
      : fundraiser.organizer!;
    let withdrawal = fundraiser.withdraw;
    let payment: Payment = {
      amount: this.getTotalDonationAmount(fundraiser, startDate, endDate),
      firstName: user.firstName,
      lastName: user.lastName,
      fundraiserId: fundraiser._id!,
      bankAccountNo: withdrawal?.bankAccountNo!,
      bankName: withdrawal?.bankName!,
    };
    this.payments.push(payment);
  }

  // get the total donation amount for each a fundraiser in the given date range
  getTotalDonationAmount(
    fundraiser: Fundraiser,
    startDate: Date,
    endDate: Date
  ) {
    let total = 0;
    let donations = fundraiser.donations?.filter((donation) => {
      let donationDate = new Date(donation.date!);
      return startDate <= donationDate && donationDate <= endDate;
    });

    donations?.forEach((donation) => {
      total += donation.amount;
    });
    return total;
  }

  // get fundraiser details for those having donations
  getFilteredFundraiserDetail() {
    this.allFundraisers.forEach(async (fund) => {
      await this.fundraiserService.getFundraiserAsync(fund._id!).then(
        (fundraiser) => {
          if (fundraiser.donations?.length! > 0) {
            this.fundsWithFullData.push(fundraiser);
          }
        },
        () => {}
      );
    });
  }

  // // export table by xlsx library
  // exportTable(tableId: string) {
  //   this.excelSrv.exportToFile("payments", tableId);
  // }
}
