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
  addMember(emal: string, fundraiserId: string): Observable<TeamMember> {
    return this.httpClient.post<TeamMember>(
      `${environment.BASE_URL}/members/${fundraiserId}`,
      emal
    );
  }
}
