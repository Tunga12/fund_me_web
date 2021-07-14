import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css'],
})
export class ShareDialogComponent implements OnInit {
  items = [
    { link: '', text: 'Facebook', icon: 'facebook' },
    { link: '', text: 'Copy link', icon: 'link' },
    { link: '', text: 'Twitter', icon: 'twitter' },
    { link: '', text: 'Instagram', icon: 'mes' },
    { link: '', text: 'Email', icon: 'email' },
    { link: '', text: 'Text message', icon: 'message' },
    { link: '', text: 'Telegram', icon: 'send' },
    { link: '', text: 'Print poster', icon: 'facebook' },
  ];
  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    console.log('Data', data);
  }

  ngOnInit(): void {}
}
