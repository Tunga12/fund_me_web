import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donation } from 'src/app/models/donation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminDonationsService {
  constructor(private http: HttpClient) {}

  // get all users
  async getAllDonations() {
    return await this.http
      .get<Donation[]>(`${environment.BASE_URL}/api/donations`)
      .toPromise();
  }

  async getDonationsCount(startDate: Date, endDate: Date): Promise<number> {
    let count = await this.http
      .post<{ count: number }>(`${environment.BASE_URL}/api/donations/count`, {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      })
      .toPromise();

    return count.count;
  }

  async getTotalRaised(startDate: Date, endDate: Date) {
    let count = await this.http
      .post<{ countBirr: number; countDollar: number }>(
        `${environment.BASE_URL}/api/donations/totalRaised`,
        {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }
      )
      .toPromise();

    console.log(count);

    return count;
  }

  async getTotalTip(startDate: Date, endDate: Date) {
    let count = await this.http
      .post<{ countBirr: number; countDollar: number }>(
        `${environment.BASE_URL}/api/donations/totalTip`,
        {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }
      )
      .toPromise();

    console.log(count);

    return count;
  }
}
