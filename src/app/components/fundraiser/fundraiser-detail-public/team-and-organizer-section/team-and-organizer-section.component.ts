import { Component, Input, OnInit } from '@angular/core';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { FundraiserService } from 'src/app/services/fundraiser/fundraiser.service';

@Component({
  selector: 'app-team-and-organizer-section',
  templateUrl: './team-and-organizer-section.component.html',
  styleUrls: ['./team-and-organizer-section.component.scss']
})
export class TeamAndOrganizerSectionComponent implements OnInit {
  @Input() fundraiser!: Fundraiser;
  constructor(
    private fundraiserServ:FundraiserService
  ) { }

  ngOnInit(): void {
  }
   // checks if this fundraiser has team members that have a status not 'pending'
   hasAcceptedTeamMembers(): boolean {
    return this.fundraiserServ.hasAcceptedTeamMembers(this.fundraiser!);
  }

}
