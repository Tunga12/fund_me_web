import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from '../../share-dialog/share-dialog.component';
import { PostAnUpdateComponent } from '../../post-an-update/post-an-update.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './my-fundriser-detail.component.html',
  styleUrls: ['./my-fundriser-detail.component.css'],
})
export class MyFundriserDetailComponent implements OnInit {
  tabs = [1, 2, 3];
  constructor(private dialog: MatDialog, private router: Router) {}
  ngOnInit(): void {}

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
  goToWithdrawalPage() {
    this.router.navigateByUrl('/withdrawal');
  }

  goBack() {
    this.router.navigateByUrl('/my-fundrisers');
  }

  goToDetailPage() {
    this.router.navigateByUrl('/fundriser-detail');
  }
  goToEditPage() {
    this.router.navigateByUrl('/edit');
  }
}
