import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostAnUpdateComponent } from 'src/app/components/post-an-update/post-an-update.component';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  show_facebook_banner = true;
  @Output() share= new EventEmitter();
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  toggleBanner() {
    this.show_facebook_banner = !this.show_facebook_banner;
  }
  openShareDialog() {
    this.share.emit();
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
