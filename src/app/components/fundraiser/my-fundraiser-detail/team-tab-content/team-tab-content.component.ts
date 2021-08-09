import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTeamMembersDialogComponent } from 'src/app/components/fundraiser/my-fundraiser-detail/team-tab-content/add-team-members-dialog/add-team-members-dialog.component';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { TeamService } from './../../../../services/team/team.service';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { TeamMember } from 'src/app/models/team-memeber.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'team-tab-content',
  templateUrl: './team-tab-content.component.html',
  styleUrls: ['./team-tab-content.component.css'],
})
export class TeamTabContentComponent implements OnInit {
  @Input() fundraiser!: Fundraiser;
  constructor(
    private dialog: MatDialog,
    private fundraiserService: FundraiserService,
    private docTitle: Title
  ) {}

  ngOnInit(): void {
    this.docTitle.setTitle('Manage teams');
  }

  hasAcceptedTeamMembers(): boolean {
    return this.fundraiserService.hasAcceptedTeamMembers(this.fundraiser!);
  }

  hasPendingTeamMembers(): boolean {
    return this.fundraiserService.hasPendingTeamMembers(this.fundraiser!);
  }
  openAddTeamMembersDialog() {
    this.dialog.open(AddTeamMembersDialogComponent, { data: this.fundraiser });
  }

  deleteInvitation(team: TeamMember) {
    let index = this.fundraiser?.teams!.indexOf(team);
    this.fundraiser?.teams!.splice(index, 1);
  }
}
