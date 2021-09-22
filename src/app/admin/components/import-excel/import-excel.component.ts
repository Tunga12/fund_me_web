import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { Payment } from '../../models/payment.model';
import { ExcelService } from '../../services/excel/excel.service';

@Component({
  selector: 'admin-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.scss'],
})
export class ImportExcelComponent implements OnInit, OnDestroy {
  payments: Payment[] = [];
  loading: boolean = false;
  result: boolean = false;
  fileChosen=false;
  totalUploads = 0;
  displayedColumns = [
    'firstName',
    'lastName',
    'bankName',
    'bankAccountNo',
    'amount',
    'fundraiserId',
    'status'
  ];
  importedPayments: Payment[] = [];
  fundraiserSub?: Subscription;
  errorMessage: string = '';
  failedPayments: Payment[] = [];

  //data source for the table
  dataSource = new MatTableDataSource<Payment>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatPaginator) sort!: MatSort;
  constructor(
    private cdr: ChangeDetectorRef,
    private excelSrv: ExcelService,
    private fundraiserService: FundraiserService,
    private title:Title
  ) {}
  ngOnDestroy(): void {
    this.fundraiserSub?.unsubscribe();
  }
  ngOnInit(): void {
    this.title.setTitle('Legas|Admin upload payments')
  }

  onFileChange(evt: any) {
    this.dataSource.data = [];
    this.cdr.detectChanges();
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) {
      this.errorMessage = 'Cannot use multiple files';
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const data = <any[]>this.excelSrv.importFromFile(bstr);
      console.log(data);

      // remove the first row (the table header)
      const importedData = data.slice(1, data.length);

      var result = {};

      // convert the data to a list of payment objects
      importedData.forEach((data_item) => {
        // construct a payment object
        this.displayedColumns.forEach((key, i) => {
          result = { ...result, [key]: data_item[i] };
        });
        this.payments.push(result as Payment);
      });

      this.dataSource.data = this.payments;
      console.log(this.dataSource.data);
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    };
    reader.readAsBinaryString(target.files[0]);
    this.fileChosen=true;
  }

  uploadPayments() {
    this.totalUploads = this.dataSource.data.length;
    this.loading = true;
    var upload = new Promise((resolve) => {
      this.dataSource.data.forEach((payment: Payment, index) => {
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
                    console.log('uploaded: ',fundraiser);
                  },
                  (error) => {
                    console.log(error);
                  }
                );
            },
            (error) => {
              console.log(error.error);
            }
          );
        if (index === this.dataSource.data.length - 1) {
          this.loading = false;
          resolve(true);
        }
      });
    });

    upload.then(() => {
      this.loading = false;
      this.result = true;
      this.dataSource.data = this.failedPayments;
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
