import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShareArgs } from 'src/app/models/share-buttons-args';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css'],
})
export class ShareDialogComponent {
  url = '';
  image = '';
  description = 'Hi, I havae created a fundraiser on gofundme please signup and help me by donating and sharing it to your friends. thanks!';
  title = 'Title to display';
  constructor(@Inject(MAT_DIALOG_DATA) data: ShareArgs) {
    console.log('Data', data.url);
    this.url = data.url;
    this.image = data.image || '';
    this.description = data.description || this.description;
    this.title = data.title || this.title;
  }
}
