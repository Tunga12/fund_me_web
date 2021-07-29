import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPhotoVideoDialogComponent } from './add-photo-video-dialog/add-photo-video-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Update } from './../../models/update.model';

@Component({
  selector: 'app-post-an-update',
  templateUrl: './post-an-update.component.html',
  styleUrls: ['./post-an-update.component.css'],
})
export class PostAnUpdateComponent implements OnInit {
  update: Update = {
    content: '',
    image:
      'https://shrouded-bastion-52038.herokuapp.com/uploads/2021-07-27T12-28-31.913Zlocation_background.jpg',
  };

  form!: FormGroup;

  constructor(private dialog: MatDialog) {}

  postUpdate() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      content: new FormControl(),
      facebook: new FormControl(),
      twitter: new FormControl(),
      donors_followers: new FormControl(),
      campign_page: new FormControl(),
    });
  }
  openAddPhotoOrVedioDialog() {
    this.dialog
      .open(AddPhotoVideoDialogComponent, this.update)
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }
}
