import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTeamMembersDialogComponent } from 'src/app/components/fundraiser/my-fundraiser-detail/team-tab-content/add-team-members-dialog/add-team-members-dialog.component';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { TeamService } from './../../../../services/team/team.service';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';
import { TeamMember } from 'src/app/models/team-memeber.model';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'team-tab-content',
  templateUrl: './team-tab-content.component.html',
  styleUrls: ['./team-tab-content.component.css'],
})
export class TeamTabContentComponent implements OnInit {
  userId=localStorage.getItem('userId');

  @Input() fundraiser!: Fundraiser;
  teamSub?: Subscription;
  constructor(
    private dialog: MatDialog,
    private fundraiserService: FundraiserService,
    private teamService: TeamService,
    private docTitle: Title,
    private snackBar: MatSnackBar,
    private snackbarServ: SnackbarService
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
    this.teamSub = this.teamService.deleteMember(team).subscribe(
      () => {
        this.snackBar.open(
          'Team deleted',
          'close',
          this.snackbarServ.getConfig()
        );
      },
      (err) => {
        console.log(err.error);
        
        this.fundraiser.teams?.push(team);
        this.snackBar.open(
          'Unable to delete',
          'close',
          this.snackbarServ.getConfig()
        );
      }
    );
  }
  isOrganizer(){
    return this.fundraiser.organizer?._id===this.userId;
  }
  
  isBeneficiary(){
    return this.fundraiser.beneficiary?._id===this.userId;
  }
}
