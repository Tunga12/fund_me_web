import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Donation } from './../../models/donation.model';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(
    private httpClient:HttpClient
  ) { }

  // create donation
  createDonation(fundraiseId: string, donation: Donation) {
    if (donation.comment?.trim() === '') {
      delete donation.comment;
    }
    return this.httpClient.post(`${environment.BASE_URL}/donations/${fundraiseId}`,donation);
  }
}
