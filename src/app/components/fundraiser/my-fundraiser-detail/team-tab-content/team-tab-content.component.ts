import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTeamMembersDialogComponent } from 'src/app/components/teams/add-team-members-dialog/add-team-members-dialog.component';
import { Fundraiser } from 'src/app/models/fundraiser.model';

@Component({
  selector: 'team-tab-content',
  templateUrl: './team-tab-content.component.html',
  styleUrls: ['./team-tab-content.component.css'],
})
export class TeamTabContentComponent implements OnInit {
  @Input() fundraiser!: Fundraiser;
  emails: string[] = [];
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  openAddTeamMembersDialog() {
    this.dialog
      .open(AddTeamMembersDialogComponent, { data: { id: 1 } })
      .afterClosed()
      .subscribe((close_result) => {
        console.log('before', this.emails);
        let duplicateEmails = [...this.emails, ...close_result];
        this.emails = [...new Set(duplicateEmails)];
        console.log(close_result);
        console.log('after', this.emails);
      });
  }

  deleteInvitation(email: string) {
    let index = this.emails.indexOf(email);
    this.emails.splice(index, 1);
  }
}
