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

@Component({
  selector: 'app-successful-payments',
  templateUrl: './successful-payments.component.html',
  styleUrls: ['./successful-payments.component.scss'],
})
export class SuccessfulPaymentsComponent implements OnInit, OnDestroy {
  @Input() payments: Payment[] = [];
  errorMessage = '';
  displayedColumns = [
    'firstName',
    'lastName',
    'bankName',
    'bankAccountNo',
    'amount',
    'fundraiserId',
    'status',
  ];

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
    var upload = new Promise((resolve) => {
      this.payments.forEach((payment: Payment, index) => {
        console.log(payment.fundraiserId);
        this.fundraiserSub = this.fundraiserService
          .getFundraiser(payment.fundraiserId)
          .subscribe(
            (fund) => {
              let withdraws = fund.totalWithdraw;
              withdraws?.push({
                date: new Date(Date.now()),
                amount: payment.amount,
              });
              let fundToBePaid = {
                ...fund,
                totalWithdraw: withdraws,
              };
              this.fundraiserSub = this.fundraiserService
                .editFundraiser(fundToBePaid._id!, fundToBePaid)
                .subscribe(
                  (fundraiser) => {
                    console.log('uploaded: ', fundraiser);
                  },
                  (error) => {
                    console.log(error);
                    this.errorMessage = error.error;
                  }
                );
            },
            (error) => {
              console.log(error.error);
              this.errorMessage = error.error;
            }
          );
        if (index === this.payments.length - 1) {
          this.loading = false;
          resolve(true);
        }
      });
    });

    upload.then(() => {
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.fundraiserSub?.unsubscribe();
  }
}
