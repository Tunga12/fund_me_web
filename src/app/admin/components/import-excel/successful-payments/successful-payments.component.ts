import {
  Component,
  Input,
  OnInit,
  ViewChild,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from 'src/app/admin/models/payment.model';
import { Subscription } from 'rxjs';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { Fundraiser } from './../../../../models/fundraiser.model';

interface Withdraw {
  date: Date;
  amount: number;
}
@Component({
  selector: 'app-successful-payments',
  templateUrl: './successful-payments.component.html',
  styleUrls: ['./successful-payments.component.scss'],
})
export class SuccessfulPaymentsComponent implements OnInit, OnDestroy {
  @Input() payments: Payment[] = [];
  errorMessage = '';

  uploadComplete=false;
  displayedColumns = [
    'firstName',
    'lastName',
    'bankName',
    'bankAccountNo',
    'amount',
    'fundraiserId',
    'status',
  ];

  // ids of fundraisers
  alreadyPaidFundraisers: string[] = []; //ids of fundraisers
  successfullyPaidFundraisers: string[] = [];
  paymentFailedFundraisers: string[] = [];

  //data source for the table
  dataSource = new MatTableDataSource<Payment>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatPaginator) sort!: MatSort;

  loading: boolean = false;
  fundraiserSub?: Subscription;

  constructor(
    private fundraiserService: FundraiserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.payments;
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  uploadPayments() {
    this.loading = true;
    this.reset();
    let upload = new Promise((resolve) => {
      this.payments.forEach((payment: Payment, index) => {
        this.fundraiserSub = this.fundraiserService
          .getFundraiser(payment.fundraiserId)
          .subscribe(
            (fundraiser) => {
              let newWithdraw = {
                date: new Date(),
                amount: payment.amount,
              };

              if (this.isValidPayment(newWithdraw, fundraiser.totalWithdraw!)) {
                fundraiser.totalWithdraw?.push(newWithdraw);
                this.editFundraiser(fundraiser._id!, fundraiser);
              } else {
                console.log('already paid');
                this.alreadyPaidFundraisers.push(payment.fundraiserId);
              }
            },
            (error) => {
              console.log(error.error);
              this.errorMessage = error.error;
              this.paymentFailedFundraisers.push(payment.fundraiserId);
            }
          );
        if (index === this.payments.length - 1) {
          this.loading = false;
          this.uploadComplete=true;
          resolve(true);
        }
      });
    });

    upload.then(() => {
      this.loading = false;
    });
  }

  // edit fundraiser
  editFundraiser(id: string, fundraiser: Fundraiser) {
    this.fundraiserSub = this.fundraiserService
      .editFundraiser(id, fundraiser)
      .subscribe(
        (fundraiser) => {
          console.log('uploaded: ', fundraiser);
          this.successfullyPaidFundraisers.push(id);
        },
        (error) => {
          console.log(error);
          this.errorMessage = error.error;
          this.paymentFailedFundraisers.push(id);
        }
      );
  }

  // if the given withdrawals list contains the given newWithdraw(payment amount
  // and the todays date) return false else true
  isValidPayment(newWithdraw: Withdraw, withdraws: Withdraw[]) {
    let existing = withdraws.filter(
      (withdraw) =>
        withdraw.amount === newWithdraw.amount &&
        this.isDatesEqual(withdraw.date, newWithdraw.date)
    );
    return existing ? false : true;
  }

  // compare equality of two dates
  isDatesEqual(date1: Date, date2: Date) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  // reset data
  reset(){
    this.successfullyPaidFundraisers=[];
    this.paymentFailedFundraisers=[];
    this.alreadyPaidFundraisers=[];
    this.uploadComplete=false;
  }


  ngOnDestroy() {
    this.fundraiserSub?.unsubscribe();
  }
}
