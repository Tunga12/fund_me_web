import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  constructor(
    private http: HttpClient
  ) { }

  inviteBeneficiary(fundraiserId: string, beneficiary: User) {
    return this.http.post(`${environment.BASE_URL}/api/withdrawal/beneficiary/invitation/${fundraiserId}`,
      beneficiary
,
      { responseType:'text'}
    );
  }
}
