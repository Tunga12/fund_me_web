import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { WithdrawalsPage } from 'src/app/admin/models/withdrawals-page.model';
import { AdminWithdrawalsService } from 'src/app/admin/services/admin-withdrawals/admin-withdrawals.service';
import { Withdrawal } from 'src/app/models/withdrawal.model';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'admin-pending-withdrawals',
  templateUrl: './pending-withdrawals.component.html',
  styleUrls: ['./pending-withdrawals.component.scss']
})
export class PendingWithdrawalsComponent implements OnInit, OnDestroy {
  displayedColumns = [
    //'firstName', 'lastName', 'email',
     'bankName', 'bankAccountNo', 'date', 'accept', 'decline']

  pendingWithdrawals!: Withdrawal[];
  withdrawalPage!: WithdrawalsPage;

  errorMessage = '';
  currentPage = 0;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) sort!: MatSort;
  //data source for the table
  dataSource = new MatTableDataSource<Withdrawal>();


  // subscriptions
  withdrawalSub?: Subscription;
  loading = false;
  constructor(
    private withdrawalService: AdminWithdrawalsService,
    private pageTitle: Title,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.pageTitle.setTitle('withdrawals| pending');
    // then get withdrawals
    this.getPendingWithdrawals();
  }

  // get pending withdrawal requests
  getPendingWithdrawals() {
    this.loading = true;
    this.withdrawalSub = this.withdrawalService.getPendingWithdrawals().subscribe(
      (withdrawalsPage: WithdrawalsPage) => {
        this.loading = false;
        this.pendingWithdrawals = withdrawalsPage.withdrawals;
        this.dataSource.data=this.pendingWithdrawals;
        this.cdr.detectChanges();
        this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
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
    this.getPendingWithdrawals();
  }

  // accept withdrawal request
  acceptWithdrawalRequest(withdrawal:Withdrawal) {
    
    let index=this.pendingWithdrawals.indexOf(withdrawal);
    this.pendingWithdrawals.splice(index,1);
    this.withdrawalSub = this.withdrawalService.acceptWithdrawalRequest(withdrawal._id!).subscribe(
      () => {
        this.snackBar.open('Request accepted', 'Close', this.snackbarService.getConfig());
        // this.getPendingWithdrawals();
      }
      ,
      (error: HttpErrorResponse) => {
        this.pendingWithdrawals.splice(index,0,withdrawal);
        this.snackBar.open('Operation failed', 'Close', this.snackbarService.getConfig());
        console.log(error.error); 
      }
    );
  }

// reject withdrawal request
rejectWithdrawalRequest(withdrawal: Withdrawal) {
  let index=this.pendingWithdrawals.indexOf(withdrawal);
    this.pendingWithdrawals.splice(index,1);

  this.withdrawalSub = this.withdrawalService.declineWithdrawalRequest(withdrawal._id!).subscribe(
    () => {      
        this.snackBar.open('Request declined successfully!', 'Close', this.snackbarService.getConfig());
    }
    ,
    (error: HttpErrorResponse) => {
      this.pendingWithdrawals.splice(index,0,withdrawal);
      this.snackBar.open('Operation failed', 'Close', this.snackbarService.getConfig());
      console.log(error.error);
    }
  );
}

  // unsubscribe if from all subscriptions
  ngOnDestroy(): void {
    this.withdrawalSub?.unsubscribe();
  }


}
