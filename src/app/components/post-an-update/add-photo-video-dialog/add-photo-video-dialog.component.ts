import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddYoutubeVideoDialogComponent } from './../add-youtube-video-dialog/add-youtube-video-dialog.component';

@Component({
  selector: 'app-add-photo-video-dialog',
  templateUrl: './add-photo-video-dialog.component.html',
  styleUrls: ['./add-photo-video-dialog.component.css'],
})
export class AddPhotoVideoDialogComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  openYoutubLinkDialog() {
    this.dialog
      .open(AddYoutubeVideoDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }
}
