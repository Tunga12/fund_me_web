import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Withdrawal } from 'src/app/models/withdrawal.model';
import { WithdrawalsPage } from '../../models/withdrawals-page.model';
import { AdminWithdrawalsService } from '../../services/admin-withdrawals/admin-withdrawals.service';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { FundraiserPage } from 'src/app/models/fundraiser-page.model';
import { Fundraiser } from 'src/app/models/fundraiser.model';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  loading: boolean=false;

  displayedColumns = [
    //'firstName', 'lastName',
   'bankName', 'bankAccountNo']

  approvedWithdrawals!: Withdrawal[];
  withdrawalPage!: WithdrawalsPage;

  errorMessage = '';
  currentPage = 0;



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) sort!: MatSort;
  
  //datasource for the table
  dataSource =new MatTableDataSource<Withdrawal>();

  // subscriptions
  withdrawalSub?: Subscription;

  @ViewChild('epltable', { static: false }) epltable?: ElementRef;
  fundraiserPage?: FundraiserPage;
  allFundraisers: Fundraiser[]=[];

  constructor(
    private cdr: ChangeDetectorRef,
    private withdrawalService: AdminWithdrawalsService,
    private pageTitle: Title,
    private fundraiserService: FundraiserService
  ) { }

 async ngOnInit() {
    this.pageTitle.setTitle('Admin | payments');
    // then get withdrawals
    this.getApprovedWithdrawals();

    await this.getAllFundraisers();
    console.log(this.allFundraisers); 
  }


  // get accepted withdrawal requests
  getApprovedWithdrawals() {
    this.loading=true;
    this.withdrawalSub = this.withdrawalService.getAcceptedWithdrawals().subscribe(
      (withdrawalsPage: WithdrawalsPage) => {
        this.loading = false;
        this.approvedWithdrawals = withdrawalsPage.withdrawals;
        this.dataSource = new MatTableDataSource<Withdrawal>(this.approvedWithdrawals);
        this.cdr.detectChanges();
        this.dataSource.paginator = this.paginator;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        console.log(error.error);
        this.errorMessage =
          error.status === 404
            ? "You don't have any withdrawal yet."
            : 'Unable to load your withdrawals, please try later';
      }
    );
 }


 async getAllFundraisers() {
  do {
    await this.getFundraisers();
  } while (this.currentPage < this.fundraiserPage?.totalPages!);
}

//get fundrisers of a page
async getFundraisers() {
  this.loading = true;
  await this.fundraiserService
    .getFundraisersAdmin(this.currentPage)
    .then(
      (fundraiserPage: FundraiserPage) => {
        this.fundraiserPage = fundraiserPage;
        console.log(fundraiserPage.fundraisers);
        
        this.allFundraisers = [
          ...this.allFundraisers,
          ...fundraiserPage.fundraisers,
        ];
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

// filter donations 
filterFundraisers(){

}
  async dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    // this.loading = true;
    let startDate = new Date(dateRangeStart.value)
    let endDate = new Date(dateRangeEnd.value)
    console.log(startDate, endDate);
    
  }

}
