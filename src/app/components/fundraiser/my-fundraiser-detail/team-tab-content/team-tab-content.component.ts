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
  styleUrls: ['./team-tab-content.component.scss'],
})
export class TeamTabContentComponent implements OnInit {
  userId=localStorage.getItem('userId');

  @Input() fundraiser!: Fundraiser;
  teamSub?: Subscription;
  errorMessage='';
  loading: boolean=false;
  constructor(
    private dialog: MatDialog,
    private fundraiserService: FundraiserService,
    private teamService: TeamService,
    private docTitle: Title,
    private snackBar: MatSnackBar,
    private snackbarServ: SnackbarService,
    private fundraiserServ: FundraiserService
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
    this.dialog.open(AddTeamMembersDialogComponent, { data: this.fundraiser })
    .afterClosed().subscribe(
      async result=>{
        if (result) {
          await this.getFundriser();
        }
      }
    );
  }

  // get fundriser using id
  async getFundriser() {
    this.loading = true;
    await this.fundraiserServ.getFundraiserAsync(this.fundraiser?._id!).then(
      (fundraiser) => {
        this.fundraiser = fundraiser;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        console.log(error.status);
        this.loading = false;
        this.errorMessage = navigator.onLine
          ? error.error
          : 'You are offline, please check your internet connection!';
      }
    );
  }

  deleteInvitation(team: TeamMember) {
    let index = this.fundraiser?.teams!.indexOf(team);
    this.fundraiser?.teams!.splice(index, 1);
    this.teamSub = this.teamService.deleteMember(team).subscribe(
      () => {
        this.snackBar.open(
          'Team member deleted',
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
