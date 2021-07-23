import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPhotoVideoDialogComponent } from '../post-an-update/add-photo-video-dialog/add-photo-video-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-ui',
  templateUrl: './edit-ui.component.html',
  styleUrls: ['./edit-ui.component.css'],
})
export class EditUiComponent implements OnInit {
  tabs = [1, 2, 3, 4];
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}
  openAddPhotoOrVedioDialog() {
    this.dialog
      .open(AddPhotoVideoDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }
  backToDetailPage() {
    this.router.navigateByUrl('/my-fundriser-detail');
  }
}
