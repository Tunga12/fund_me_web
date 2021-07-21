import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from 'src/app/components/share-dialog/share-dialog.component';

@Component({
  selector: 'donations-tab-conntent',
  templateUrl: './donations-tab-conntent.component.html',
  styleUrls: ['./donations-tab-conntent.component.css']
})
export class DonationsTabConntentComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }
   openShareDialog() {
    this.dialog
      .open(ShareDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }

}
