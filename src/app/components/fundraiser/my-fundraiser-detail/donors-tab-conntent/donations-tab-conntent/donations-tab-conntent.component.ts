import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from 'src/app/components/shared/share-dialog/share-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Fundraiser } from 'src/app/models/fundraiser.model';

@Component({
  selector: 'donations-tab-conntent',
  templateUrl: './donations-tab-conntent.component.html',
  styleUrls: ['./donations-tab-conntent.component.css'],
})
export class DonationsTabConntentComponent implements OnInit {
  @Input() fundraiser!: Fundraiser;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  openShareDialog() {
    this.dialog
      .open(ShareDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }

}
