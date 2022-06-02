import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Donation, DonationInfo } from './../../models/donation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  constructor(private httpClient: HttpClient) { }

  // create donation
  createDonation(
    fundraiserId: string,
    donation: Donation
  ): Observable<HttpResponse<any>> {
    if (donation.comment?.trim() === '') {
      delete donation.comment;
    }
    return this.httpClient.post(
      `${environment.BASE_URL}/api/donations/${fundraiserId}`,
      donation,
      { observe: 'response', responseType: 'text' }
    );
  }

  // go to paypal
  goToPayPal(fundraiserId: string, donation: Donation) {
    return this.httpClient.post(
      `${environment.BASE_URL}/api/donation/pay/${fundraiserId}`,
      donation
    );
  }

  goToTelebirr(json: { returnUrl: string, subject: string, donation: Donation }) {
    return this.httpClient.post(
      `${environment.BASE_URL}/api/telebirr/pay`,
      json
    );
  }

  getDonationInfo(fundraiserId: string) {

    return this.httpClient.get<DonationInfo>(`${environment.BASE_URL}/api/donations/getDonationsInfo/${fundraiserId}`);
  }

  getMoreComments(fundraiserId: string, pageNumber: number) {
    return this.httpClient.get<Donation[]>(`${environment.BASE_URL}/api/donations/withComments/${fundraiserId}?pageNumber=${pageNumber}`);
  }

  getMoreDonations(fundraiserId: string, pageNumber: number) {
    return this.httpClient.get<Donation[]>(`${environment.BASE_URL}/api/donations/all/${fundraiserId}?pageNumber=${pageNumber}`);
  }
  getMoreTopDonations(fundraiserId: string, pageNumber: number) {
    return this.httpClient.get<Donation[]>(`${environment.BASE_URL}/api/donations/allTop/${fundraiserId}?pageNumber=${pageNumber}`);
  }
}
