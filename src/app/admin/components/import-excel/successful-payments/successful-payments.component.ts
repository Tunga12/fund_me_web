import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from 'src/app/admin/models/payment.model';

@Component({
  selector: 'app-successful-payments',
  templateUrl: './successful-payments.component.html',
  styleUrls: ['./successful-payments.component.scss']
})
export class SuccessfulPaymentsComponent implements OnInit {
  @Input() payments:Payment[]=[];
  displayedColumns = [
    'firstName',
    'lastName',
    'bankName',
    'bankAccountNo',
    'amount',
    'fundraiserId',
    'status'
  ];

  //data source for the table
  dataSource = new MatTableDataSource<Payment>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatPaginator) sort!: MatSort;

  constructor() { }
  
  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(): void {
    this.dataSource.data = this.payments;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  }
}
