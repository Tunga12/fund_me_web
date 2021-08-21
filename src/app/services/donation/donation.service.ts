import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Donation } from './../../models/donation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  constructor(private httpClient: HttpClient) { }

  // create donation
  createDonation(fundraiseId: string, donation: Donation): Observable<HttpResponse<any>> {
    if (donation.comment?.trim() === '') {
      delete donation.comment;
    }
    return this.httpClient.post(
      `${environment.BASE_URL}/api/donations/${fundraiseId}`,
      donation,
      { observe: 'response',responseType:'text'}    
    );
  }
}
