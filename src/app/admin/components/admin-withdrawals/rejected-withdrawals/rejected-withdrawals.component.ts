import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { WithdrawalsPage } from 'src/app/admin/models/withdrawals-page.model';
import { AdminWithdrawalsService } from 'src/app/admin/services/admin-withdrawals/admin-withdrawals.service';
import { Withdrawal } from 'src/app/models/withdrawal.model';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'admin-rejected-withdrawals',
  templateUrl: './rejected-withdrawals.component.html',
  styleUrls: ['./rejected-withdrawals.component.scss'],
})
export class RejectedWithdrawalsComponent implements OnInit, OnDestroy {
  displayedColumns = [
    // 'firstName', 'lastName', 'email',
    'bankName',
    'bankAccountNo',
    'reason',
    'date',
    'accept',
  ];

  rejectedWithdrawals!: Withdrawal[];
  withdrawalPage!: WithdrawalsPage;

  errorMessage = '';
  currentPage = 0;
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) sort!: MatSort;

  //data source for the table
  dataSource = new MatTableDataSource<Withdrawal>();

  // subscriptions
  withdrawalSub?: Subscription;
  constructor(
    private withdrawalService: AdminWithdrawalsService,
    private pageTitle: Title,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.pageTitle.setTitle('Admin| withdrawals declined');
    // then get withdrawals
    this.getRejectedWithdrawals();
  }

  // get rejected withdrawal requests
  getRejectedWithdrawals() {
    this.loading = true;
    this.withdrawalSub = this.withdrawalService
      .getDeclinedWithdrawals()
      .subscribe(
        (withdrawalsPage: WithdrawalsPage) => {
          this.loading = false;
          this.rejectedWithdrawals = withdrawalsPage.withdrawals;
          console.log(this.rejectedWithdrawals);

          this.dataSource.data = this.rejectedWithdrawals;
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

  acceptWithdrawalRequest(withdrawal: Withdrawal) {
    let index = this.rejectedWithdrawals.indexOf(withdrawal);
    this.rejectedWithdrawals.splice(index, 1);
    this.updateTable();
    this.withdrawalSub = this.withdrawalService
      .acceptWithdrawalRequest(withdrawal._id!)
      .subscribe(
        () => {
          this.snackBar.open(
            'Request accepted',
            'Close',
            this.snackbarService.getConfig()
          );
          // this.getPendingWithdrawals();
        },
        (error: HttpErrorResponse) => {
          this.rejectedWithdrawals.splice(index, 0, withdrawal);
          this.snackBar.open(
            'Operation failed',
            'Close',
            this.snackbarService.getConfig()
          );
          console.log(error.error);
          this.updateTable();
        }
      );
  }

  updateTable() {
    this.dataSource.data = this.rejectedWithdrawals;
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
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
