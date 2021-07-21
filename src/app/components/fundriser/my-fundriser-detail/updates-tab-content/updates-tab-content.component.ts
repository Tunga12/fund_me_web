import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostAnUpdateComponent } from 'src/app/components/post-an-update/post-an-update.component';

@Component({
  selector: 'updates-tab-content',
  templateUrl: './updates-tab-content.component.html',
  styleUrls: ['./updates-tab-content.component.css'],
})
export class UpdatesTabContentComponent implements OnInit {
  constructor(private dialog:MatDialog) {}

  ngOnInit(): void {}

  openUpdateDialog() {
    this.dialog
      .open(PostAnUpdateComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }
}
