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
  ];

  // subscriptions
  fundraiserSub?: Subscription;
  withdrawalSub?: Subscription;

  //data source for the table
  dataSource = new MatTableDataSource<Payment>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatPaginator) sort!: MatSort;

  decliningStarted: boolean = false;

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
  declineWithdrawalRequest(fundraiserId: string,reason:string) {
    this.fundraiserSub = this.fundraiserService.getFundraiser(fundraiserId).subscribe(
      (fundraiser) => {
        console.log(fundraiser);
        this.performDeclineWithdrawalRequest(fundraiser.withdraw?._id!,reason);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
        console.log(error.error);
      }
    );
  }

  // decline a withdrawal request
  performDeclineWithdrawalRequest(withdrawalId: string, reason:string) {
    this.errorMessage='';
    this.withdrawalSub = this.withdrawalService
      .declineWithdrawalRequest(withdrawalId,reason)
      .subscribe(
        (result) => {
          console.log(result);
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.error;
          console.log(error.error);
        }
      );
  }

  declineAll() {
    this.decliningStarted = true;
    this.payments.forEach((payment, index) => {
      if (!payment.reason) {
        console.log('please add reasons for all');
        this.errorMessage = 'please add reasons for all';
        this.haveNoReasons.push(payment.fundraiserId);
        return;
      }
      this.payments.splice(index,1);
      this.dataSource.data=this.payments;
      this.declineWithdrawalRequest(payment.fundraiserId,payment.reason);
      console.log('upload successful');
    });
  }

  reasonChanged(payment: Payment) {
    if (payment.reason) {
      if (this.haveNoReasons.includes(payment.fundraiserId)) {
        let index = this.haveNoReasons.indexOf(payment.fundraiserId);
        console.log(index);
        this.haveNoReasons.splice(index , 1);
        this.haveNoReasons.length===0?this.errorMessage = '':'';
      }
    } else {
      this.haveNoReasons.push(payment.fundraiserId);
      this.errorMessage = 'please add reasons for all';
    }
  }

  ngOnDestroy() {
    this.fundraiserSub?.unsubscribe();
    this.withdrawalSub?.unsubscribe();
  }
}
