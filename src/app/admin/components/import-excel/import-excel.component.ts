import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from '../../models/payment.model';
import { ExcelService } from '../../services/excel/excel.service';

@Component({
  selector: 'admin-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.css'],
})
export class ImportExcelComponent {
  displayedColumns = [
    'firstName',
    'lastName',
    'bankName',
    'bankAccountNo',
    'amount',
    'fundraiserId',
  ];
  //datasource for the table
  dataSource = new MatTableDataSource<Payment>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatPaginator) sort!: MatSort;

  importPayments: Payment[] = [];

  constructor(private cdr: ChangeDetectorRef, private excelSrv: ExcelService) {}

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const data = <any[]>this.excelSrv.importFromFile(bstr);
      console.log(data);

      // remove the first row (the table header)
      const importedData = data.slice(1, data.length);

      let payments: Payment[] = [];
      var result = {};

      // convert the data to a list of payment objects
      importedData.forEach((data_item) => {
      // construct a payyment object
        this.displayedColumns.forEach((key, i) => {
          result = { ...result,  [key]: data_item[i]  };
        });
        payments.push(result as Payment);
      });

      this.dataSource.data = payments;
      console.log(this.dataSource.data);
      
      this.cdr.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
