import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPhotoVideoDialogComponent } from './add-photo-video-dialog/add-photo-video-dialog.component';

@Component({
  selector: 'app-post-an-update',
  templateUrl: './post-an-update.component.html',
  styleUrls: ['./post-an-update.component.css'],
})
export class PostAnUpdateComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  openAddPhotoOrVedioDialog() {
    this.dialog
      .open(AddPhotoVideoDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }
}
