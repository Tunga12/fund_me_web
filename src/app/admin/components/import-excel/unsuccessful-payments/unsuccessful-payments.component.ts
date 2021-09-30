import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Payment } from 'src/app/admin/models/payment.model';
import { FundraiserService } from './../../../../services/fundraiser/fundraiser.service';
import { AdminWithdrawalsService } from 'src/app/admin/services/admin-withdrawals/admin-withdrawals.service';

@Component({
  selector: 'app-unsuccessful-payments',
  templateUrl: './unsuccessful-payments.component.html',
  styleUrls: ['./unsuccessful-payments.component.scss'],
})
export class UnsuccessfulPaymentsComponent implements OnInit, OnDestroy {
  @Input() payments: Payment[] = [];
  loading = false;
  haveNoReasons: string[] = [];
  errorMessage = '';

  displayedColumns = [
    'firstName',
    'lastName',
    'bankName',
    'bankAccountNo',
    'amount',
    'fundraiserId',
    'status',
    'reason',
    'decline',
  ];

  // fundraiser ids to display statistics
  successful: string[] = [];
  failed: string[] = [];
  alreadyDeclined: string[] = [];

  // subscriptions
  fundraiserSub?: Subscription;
  withdrawalSub?: Subscription;

  //data source for the table
  dataSource = new MatTableDataSource<Payment>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatPaginator) sort!: MatSort;

  decliningComplete: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private fundraiserService: FundraiserService,
    private withdrawalService: AdminWithdrawalsService
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.payments;
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  // get a fundraiser by its id, then decline its withdrawal request
  declineWithdrawalRequest(fundraiserId: string, reason: string) {
    this.fundraiserSub = this.fundraiserService
      .getFundraiser(fundraiserId)
      .subscribe(
        (fundraiser) => {
          console.log(fundraiser);
          this.performDeclineWithdrawalRequest(
            fundraiser.withdraw?._id!,
            reason,
            fundraiserId
          );
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.error;
          console.log(error.error);
          this.failed.push(fundraiserId);
        }
      );
  }

  // decline a withdrawal request
  performDeclineWithdrawalRequest(
    withdrawalId: string,
    reason: string,
    fundId: string
  ) {
    this.errorMessage = '';
    this.withdrawalSub = this.withdrawalService
      .declineWithdrawalRequest(withdrawalId, reason)
      .subscribe(
        (result) => {
          this.successful.push(fundId);
          console.log(result);
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.error;
          error.status === 400 &&
          error.error
            .toLowerCase()
            .startsWith('this withdrawal request has already been declined.')
            ? this.alreadyDeclined.push(fundId)
            : this.failed.push(fundId);
          console.log(error.error);
        }
      );
  }

  declineAll() {
    this.reset();
    this.payments.forEach((payment, index) => {
      if (!payment.reason) {
        console.log('please add reasons for all');
        this.errorMessage = 'please add reasons for all';
        this.haveNoReasons.push(payment.fundraiserId);
        return;
      }
      this.declineWithdrawalRequest(payment.fundraiserId, payment.reason);
      if (index === this.payments.length-1) {
        this.decliningComplete = true;
      }
      console.log('upload successful');
    });
  }

  reasonChanged(payment: Payment) {
    if (payment.reason) {
      if (this.haveNoReasons.includes(payment.fundraiserId)) {
        let index = this.haveNoReasons.indexOf(payment.fundraiserId);
        console.log(index);
        this.haveNoReasons.splice(index, 1);
        this.haveNoReasons.length === 0 ? (this.errorMessage = '') : '';
      }
    } else {
      this.haveNoReasons.push(payment.fundraiserId);
      this.errorMessage = 'please add reasons for all';
    }
  }

  reset() {
    this.successful = [];
    this.failed = [];
    this.alreadyDeclined = [];
    this.decliningComplete = false;
  }

  ngOnDestroy() {
    this.fundraiserSub?.unsubscribe();
    this.withdrawalSub?.unsubscribe();
  }
}
