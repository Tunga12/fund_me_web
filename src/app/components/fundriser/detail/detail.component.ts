import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent } from '../../share-dialog/share-dialog.component';
import { PostAnUpdateComponent } from './../../post-an-update/post-an-update.component';
import { AddTeamMembersDialogComponent } from './../../teams/add-team-members-dialog/add-team-members-dialog.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  tabs = [1, 2, 3];
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  openShareDialog() {
    this.dialog
      .open(ShareDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }

  openUpdateDialog() {
    this.dialog
      .open(PostAnUpdateComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => console.log(close_result));
  }
  openAddTeamMembertsDialog() {
     this.dialog
       .open(AddTeamMembersDialogComponent, { data: { id: 1 } })
       .afterClosed()
       .subscribe((close_result) => console.log(close_result));
  }
}
