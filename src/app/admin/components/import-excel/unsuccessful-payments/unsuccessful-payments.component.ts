import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Payment } from 'src/app/admin/models/payment.model';

@Component({
  selector: 'app-unsuccessful-payments',
  templateUrl: './unsuccessful-payments.component.html',
  styleUrls: ['./unsuccessful-payments.component.scss'],
})
export class UnsuccessfulPaymentsComponent implements OnInit, AfterViewInit {
  @Input() payments: Payment[] = [];
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

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dataSource.data = this.payments;
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.payments;
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
