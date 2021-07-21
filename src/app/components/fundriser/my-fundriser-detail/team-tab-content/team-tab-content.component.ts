import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTeamMembersDialogComponent } from 'src/app/components/teams/add-team-members-dialog/add-team-members-dialog.component';

@Component({
  selector: 'team-tab-content',
  templateUrl: './team-tab-content.component.html',
  styleUrls: ['./team-tab-content.component.css'],
})
export class TeamTabContentComponent implements OnInit {
  emails: string[] = [];
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  openAddTeamMembersDialog() {
    this.dialog
      .open(AddTeamMembersDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => {
        console.log('before', this.emails);
        this.emails = [this.emails, ...close_result];
        console.log(close_result);
        console.log('after', this.emails);
      });
  }
}
