import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { WithdrawalsPage } from 'src/app/admin/models/withdrawals-page.model';
import { AdminWithdrawalsService } from 'src/app/admin/services/admin-withdrawals/admin-withdrawals.service';
import { Withdrawal } from 'src/app/models/withdrawal.model';

@Component({
  selector: 'admin-rejected-withdrawals',
  templateUrl: './rejected-withdrawals.component.html',
  styleUrls: ['./rejected-withdrawals.component.css']
})
export class RejectedWithdrawalsComponent implements OnInit, OnDestroy {
  displayedColumns = [
    // 'firstName', 'lastName', 'email',
     'bankName', 'bankAccountNo', 'date']

  rejectedWithdrawals!: Withdrawal[];
  withdrawalPage!: WithdrawalsPage;

  errorMessage = '';
  currentPage = 0;
  loading = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) sort!: MatSort;

  //datasource for the table
  dataSource=new MatTableDataSource<Withdrawal>();

  // subscriptions
  withdrawalSub?: Subscription;
  constructor(
    private withdrawalService: AdminWithdrawalsService,
    private pageTitle: Title
  ) { }

  ngOnInit(): void {
    this.pageTitle.setTitle('withdrawals| pending');
    // then get withdrawals
    this.getRejectedWithdrawals();
  }

  // get rejected withdrawal requests
  getRejectedWithdrawals() {
    this.loading=true;
    this.withdrawalSub = this.withdrawalService.getDeclinedWithdrawals().subscribe(
      (withdrawalsPage: WithdrawalsPage) => {
        this.loading = false;
        this.rejectedWithdrawals = withdrawalsPage.withdrawals;
        this.dataSource = new MatTableDataSource<Withdrawal>(this.rejectedWithdrawals);

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

  // checks if the current page has next page
  hasNext() {
    return this.withdrawalPage?.hasNextPage || false;
  }

  // get the withdrawals on the next page
  nextPage() {
    this.currentPage += 1;
    this.getRejectedWithdrawals();
  }

  // unsubscribe if from all subscriptions
  ngOnDestroy(): void {
    this.withdrawalSub?.unsubscribe();
  }



}
