import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription, Observable } from 'rxjs';
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

  successfulPayments: Payment[] = []; //payments having status 1
  unsuccessfulPayments: Payment[] = []; // payments having status 0

  loading: boolean = false;
  result: boolean = false;

  fileChosen = false;
  displayedColumns = [
    'firstName',
    'lastName',
    'bankName',
    'bankAccountNo',
    'amount',
    'fundraiserId',
    'status',
  ];
  importedPayments: Payment[] = [];
  fundraiserSub?: Subscription;
  errorMessage: string = '';
  constructor(private excelSrv: ExcelService, private title: Title) {}
  ngOnDestroy(): void {
    this.fundraiserSub?.unsubscribe();
  }
  ngOnInit(): void {
    this.title.setTitle('Legas | Admin upload payments');
  }

  onFileChange(evt: any) {
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
      this.classifyPayments();
    };
    reader.readAsBinaryString(target.files[0]);
    this.fileChosen = true;
  }

  classifyPayments() {
    this.payments.forEach((payment) => {
      if (payment.status === 1) {
        this.successfulPayments.push(payment);
      } else {
        this.unsuccessfulPayments.push(payment);
      }
    });
  }
}
