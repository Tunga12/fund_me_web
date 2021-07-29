import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  constructor(
    private httpClient:HttpClient
  ) { }

  // create donation
  createDonation(fundraiseId:string,donation: any) {
    return this.httpClient.post(`${environment.BASE_URL}/donations/${fundraiseId}`,donation);
  }
}
