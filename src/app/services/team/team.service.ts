import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TeamMember } from 'src/app/models/team-memeber.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private httpClient: HttpClient) {}

  // add a team member
  addMember(
    email: { email: string },
    fundraiserId: string
  ): Observable<TeamMember> {
    return this.httpClient.post<TeamMember>(
      `${environment.BASE_URL}/api/members/${fundraiserId}`,
      email
    );
  }

  // Delete member
  deleteMember(team: TeamMember) {
    return this.httpClient.delete(
      `${environment.BASE_URL}/api/members/${team.id._id}`,
      { responseType: 'text' }
    );
  }

  // Accept invitation to be a team member of a campaign
  acceptInvitation(fundriserId: string) {
   return this.httpClient.put(
     `${environment.BASE_URL}/api/fundraisers/invitation/${fundriserId}`,
     { accepted: true },
     { responseType: 'text' }
   );
  }

  // Decline invitation to be a team member of a campaign
  declineInvitation(fundriserId: string) {
    return this.httpClient.put(
      `${environment.BASE_URL}/api/fundraisers/invitation/${fundriserId}`,
      { accepted: false },
      { responseType: 'text' }
    );
  }
}
