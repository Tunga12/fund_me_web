import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPhotoVideoDialogComponent } from './add-photo-video-dialog/add-photo-video-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post-an-update',
  templateUrl: './post-an-update.component.html',
  styleUrls: ['./post-an-update.component.css'],
})
export class PostAnUpdateComponent implements OnInit {
  story = '';
  form: FormGroup;
  constructor(private dialog: MatDialog) {

    this.form = new FormGroup({
      story: new FormControl(),
      facebook: new FormControl(),
      twitter: new FormControl(),
      donors_followers: new FormControl(),
      campign_page: new FormControl(),
    });
  }

  ngOnInit(): void {}
  openAddPhotoOrVedioDialog() {
    this.dialog
      .open(AddPhotoVideoDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }
}
