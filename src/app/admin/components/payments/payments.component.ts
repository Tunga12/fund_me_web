import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Withdrawal } from 'src/app/models/withdrawal.model';
import { WithdrawalsPage } from '../../models/withdrawals-page.model';
import { AdminWithdrawalsService } from '../../services/admin-withdrawals/admin-withdrawals.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  loading: boolean=false;

  displayedColumns = ['firstName', 'lastName', 'bankName', 'bankAccountNo']

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

  constructor(
    private withdrawalService: AdminWithdrawalsService,
    private pageTitle: Title
  ) { }

  ngOnInit(): void {
    this.pageTitle.setTitle('withdrawals| payments');
    // then get withdrawals
    this.getApprovedWithdrawals();
  }


  // get accepted withdrawal requests
  getApprovedWithdrawals() {
    this.loading=true;
    this.withdrawalSub = this.withdrawalService.getAcceptedWithdrawals().subscribe(
      (withdrawalsPage: WithdrawalsPage) => {
        this.loading = false;
        this.approvedWithdrawals = withdrawalsPage.withdrawals;
        this.dataSource = new MatTableDataSource<Withdrawal>(this.approvedWithdrawals);
      
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

  async dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    // this.loading = true;
    let startDate = new Date(dateRangeStart.value)
    let endDate = new Date(dateRangeEnd.value)
  }

}
