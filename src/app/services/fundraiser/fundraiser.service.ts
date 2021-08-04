import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HomeFundraiser } from 'src/app/models/home-fundraiser.model';
import { environment } from 'src/environments/environment';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { Donation } from 'src/app/models/donation.model';

@Injectable({
  providedIn: 'root',
})
export class FundraiserService {
  constructor(private http: HttpClient) {}
  // get first page
  getFundraisers(): Observable<HomeFundraiser> {
    return this.http.get<HomeFundraiser>(
      `${environment.BASE_URL}/fundraisers/popular`
    );
  }

  // create fundiser
  createFundraiser(fundraiser: Fundraiser): Observable<Fundraiser> {
    //  TODO
    let customFundraiser = {
      ...fundraiser,
      isPublished: true,
      category: fundraiser.category?._id,
    };
    console.log('cusome', customFundraiser), console.log('orginal', fundraiser);

    return this.http.post<Fundraiser>(
      `${environment.BASE_URL}/fundraisers`,
      customFundraiser
    );
  }

  //get a single fundraiser by id
  getFundraiser(fudriserId: string): Observable<Fundraiser> {
    return this.http.get<Fundraiser>(
      `${environment.BASE_URL}/fundraisers/${fudriserId}`
    );
  }

  // get fundraisers of current user
  getMyFundraisers(): Observable<HomeFundraiser> {
    return this.http.get<HomeFundraiser>(
      `${environment.BASE_URL}/fundraisers/user`
    );
  }

  //Edit a fundraiser by id
  editFundraiser(fundraiser: Fundraiser): Observable<Fundraiser> {
    let fundraiserId = fundraiser._id;
    // remove the _id element :not needed for update
    delete fundraiser._id;
    delete fundraiser.__v;
    // update the fundraiser  since we only need id of the category
    let customFundraiser = {
      ...fundraiser,
      category: fundraiser.category?._id
    };
    return this.http.put<Fundraiser>(
      `${environment.BASE_URL}/fundraisers/${fundraiserId}`,
      customFundraiser
    );
  }

  // delete funraiser by id
  deleteFundraiser(fundraiserId: string): Observable<string> {
    return this.http.delete<string>(
      `${environment.BASE_URL}/fundraisers/${fundraiserId}`
    );
  }

  /*non http sevices */
  //  get percentage of total raised to goalAmount of this fundraiserr
  getPercentage(fundraiser: Fundraiser): number {
    if (fundraiser!.goalAmount! > 0)
      return (fundraiser!.totalRaised! * 100) / fundraiser!.goalAmount!;
    return 0;
  }

  // returns the most recent donation among the list of donations
  getRecentDonation(donations: Donation[]): Donation {
    let sorted = this.sortDonationsByDateDSC(donations);
    return sorted[0];
  }

  // returns the first(earliest) donation among the list
  getFirstDonation(donations: Donation[]): Donation {
    let sorted = this.sortDonationsByDateDSC(donations);
    let length = sorted.length;
    return sorted[length - 1];
  }

  // returns donation with the highest amount
  getTopDonation(donations: Donation[]): Donation {
    let sorted = this.sortDonationsByAmountDSC(donations);
    return sorted[0];
  }

  // sort donations by amount descending
  sortDonationsByAmountDSC(donations: Donation[]): Donation[] {
    return donations.sort((d1, d2) => d2.amount - d1.amount);
  }

  // sort donations by amount descending
  sortDonationsByAmountASC(donations: Donation[]): Donation[] {
    return donations.sort((d1, d2) => d1.amount - d2.amount);
  }

  // sort donations by date Descending
  sortDonationsByDateDSC(donations: Donation[]): Donation[] {
    return donations.sort(
      (d1: Donation, d2: Donation) =>
        Date.parse(d2.date?.toString() ?? '') -
        Date.parse(d1.date?.toString() ?? '')
    );
  }
}
