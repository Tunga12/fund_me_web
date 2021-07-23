import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostAnUpdateComponent } from 'src/app/components/post-an-update/post-an-update.component';

@Component({
  selector: 'updates-tab-content',
  templateUrl: './updates-tab-content.component.html',
  styleUrls: ['./updates-tab-content.component.css'],
})
export class UpdatesTabContentComponent implements OnInit {
  text = ` fgI started a GoFundMe campaign and I'd like you to join my fundraising
    team. I started a GoFundMe campaign and I'd like you to join my fundraising
    team. sI started a GoFundMe campaign and I'd like you to join my fundraising
    team`;
  updates = [
    {
      imageUrl: '',
      updateText: this.text,
    },
    {
      imageUrl: '/assets/images/step2.jpg',
      updateText: this.text,
    },
    {
      imageUrl: '/assets/images/step2.jpg',
      updateText: this.text,
    },
  ];

  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {}

  openUpdateDialog() {
    this.dialog
      .open(PostAnUpdateComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => {
        console.log(close_result);
        this.updates.push(close_result);
        console.log(this.updates);
        
      });
  }
  deleteUpdate(update: any) {
    let index = this.updates.indexOf(update);
    this.updates.splice(index, 1);
  }
}
