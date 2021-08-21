import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donation } from 'src/app/models/donation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminDonationsService {

  constructor(private http: HttpClient) { }

  // get all users
  async getAllDonations() {
    return await this.http.get<Donation[]>(`${environment.BASE_URL}/api/donations`).toPromise();
  }
}