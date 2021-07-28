import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HomeFundraiser } from 'src/app/models/home-fundraiser.model';
import { environment } from 'src/environments/environment';
import { Fundraiser } from 'src/app/models/fundraiser.model';

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
      category: fundraiser.category?._id,
      beneficiary: '60fc6e2520f6bd0015d97759',
      image:
        'https://shrouded-bastion-52038.herokuapp.com/uploads/2021-07-27T12-28-31.913Zlocation_background.jpg',
    };
    console.log("cusome",customFundraiser),
    console.log("orginal",fundraiser);
    
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

  // get fundraisers by user id
  getMyFundraisers(uiserId: string): Observable<Fundraiser[]> {
    return this.http.get<Fundraiser[]>(
      `${environment.BASE_URL}/fundraisers/user/${uiserId}`
    );
  }

  //Edit a fundraiser by id
  editFundraiser(fundraiser: Fundraiser): Observable<Fundraiser> {
    return this.http.put<Fundraiser>(
      `${environment.BASE_URL}/fundraisers/${fundraiser._id}`,
      fundraiser
    );
  }
}
