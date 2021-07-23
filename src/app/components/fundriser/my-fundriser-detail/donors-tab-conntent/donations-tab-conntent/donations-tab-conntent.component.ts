import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from 'src/app/components/share-dialog/share-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface Donation {
  date: string;
  email: string;
  name: string;
  amount: number;
}

const DONTOION_DATA: Donation[] = [
  {
    date: '12/11/202',
    amount: 2400,
    email: 'xyz@gm.com',
    name: 'Gedschoo Abdissndns',
  },
  {
    date: '12/11/202',
    amount: 2400,
    email: 'xyz@gm.com',
    name: 'Gedschoo Abdissndns',
  },
  {
    date: '12/11/202',
    amount: 2400,
    email: 'xyz@gm.com',
    name: 'Gedschoo Abdissndns',
  },
];

@Component({
  selector: 'donations-tab-conntent',
  templateUrl: './donations-tab-conntent.component.html',
  styleUrls: ['./donations-tab-conntent.component.css'],
})
export class DonationsTabConntentComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  openShareDialog() {
    this.dialog
      .open(ShareDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }

  displayedColumns: string[] = ['date', 'name', 'email', 'amount', 'option'];
  dataSource = new MatTableDataSource(DONTOION_DATA);

  @ViewChild(MatSort) sort = new MatSort();

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
