import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostAnUpdateComponent } from 'src/app/components/post-an-update/post-an-update.component';
import { ShareDialogComponent } from 'src/app/components/share-dialog/share-dialog.component';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  show_facebook_banner = true;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  toggleBanner() {
    this.show_facebook_banner = !this.show_facebook_banner;
  }
  openShareDialog() {
    this.dialog
      .open(ShareDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => {
        console.log(close_result);
        // this.updates.push(close_result);
        // console.log(this.updates);
      });
  }
  openUpdateDialog() {
    this.dialog
      .open(PostAnUpdateComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => {
        console.log(close_result);
        // this.updates.push(close_result);
        // console.log(this.updates);
      });
  }
}
