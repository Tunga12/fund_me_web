import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FundraiserPage } from 'src/app/models/fundraiser-page.model';
import { environment } from 'src/environments/environment';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { Donation } from 'src/app/models/donation.model';
import { TeamMember } from 'src/app/models/team-member.model';

@Injectable({
  providedIn: 'root',
})
export class FundraiserService {
  getPercentage(fundraiser: Fundraiser): number {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  // get fundraisers by page
  getFundraisers(page: number): Observable<FundraiserPage> {
    return this.http.get<FundraiserPage>(
      `${environment.BASE_URL}/api/fundraisers/popular/?page=${page}`
    );
  }
  // get fundraisers by page
  async getFundraisersAsync(page: number) {
    return await this.http
      .get<FundraiserPage>(
        `${environment.BASE_URL}/api/fundraisers/popular/?page=${page}`
      )
      .toPromise();
  }

  // get fundraisers by page
  async getAdminFundraisers(page: number) {
    return await this.http
      .get<FundraiserPage>(
        `${environment.BASE_URL}/api/fundraisers/?page=${page}`
      )
      .toPromise();
  }

  // create fundraiser
  createFundraiser(fundraiser: Fundraiser): Observable<Fundraiser> {
    let customFundraiser = {
      ...fundraiser,
      isPublished: true,
      category: fundraiser.category?._id,
    };

    return this.http.post<Fundraiser>(
      `${environment.BASE_URL}/api/fundraisers`,
      customFundraiser
    );
  }

  //get a single fundraiser by id
  getFundraiser(fundraiserId: string): Observable<Fundraiser> {
    return this.http.get<Fundraiser>(
      `${environment.BASE_URL}/api/fundraisers/${fundraiserId}`
    );
  }
  //get a single fundraiser by id
  getFundraiserAsync(fundraiserId: string) {
    return this.http
      .get<Fundraiser>(`${environment.BASE_URL}/api/fundraisers/${fundraiserId}`)
      .toPromise();
  }

  // get fundraisers of current user
  getMyFundraisers(): Observable<FundraiserPage> {
    return this.http.get<FundraiserPage>(
      `${environment.BASE_URL}/api/fundraisers/user`
    );
  }

  // get team fundraisers of current user
  getMemberFundraisers(): Observable<FundraiserPage> {
    return this.http.get<FundraiserPage>(
      `${environment.BASE_URL}/api/fundraisers/member`
    );
  }

  // get fundraisers for current who is beneficiary of
  getBeneficiaryFundraisers(): Observable<FundraiserPage> {
    return this.http.get<FundraiserPage>(
      `${environment.BASE_URL}/api/fundraisers/beneficiary`
    );
  }

  //Edit a fundraiser by id
  editFundraiser(
    fundraiserId: string,
    fundraiser: Fundraiser
  ): Observable<Fundraiser> {
    // remove the unnecessary elements: not needed for update
    delete fundraiser._id;
    delete fundraiser.__v;
    delete fundraiser.beneficiary;
    if (!fundraiser.category) {
      delete fundraiser.category
    }
    let customFundraiser = {
      ...fundraiser,
      category: fundraiser.category?._id,
      organizer:fundraiser.organizer?._id,
      withdraw: fundraiser.withdraw?._id
    };

    return this.http.put<Fundraiser>(
      `${environment.BASE_URL}/api/fundraisers/${fundraiserId}`,
      customFundraiser
    );
  }

  // delete fundraiser by id
  deleteFundraiser(fundraiserId: string): Observable<string> {
    return this.http.delete<string>(
      `${environment.BASE_URL}/api/fundraisers/${fundraiserId}`
    );
  }

  // search fundraiser by title
  search(title: string, page: number): Observable<FundraiserPage> {
    return this.http.get<FundraiserPage>(
      `${environment.BASE_URL}/api/fundraisers/title/${title}?page=${page}`
    );
  }

  // set beneficiary id for a fundraiser
  setBeneficiary(
    fundraiser: Fundraiser,
    beneficiaryId: string
  ): Observable<Fundraiser> {
    let fundraiserId = fundraiser._id;
    // remove the _id element :not needed for update
    delete fundraiser._id;
    delete fundraiser.__v;
    delete fundraiser.beneficiary;
    // update the fundraiser  since we only need id of the category
    let customFundraiser = {
      ...fundraiser,
      category: fundraiser.category?._id,
      organizer: fundraiser.organizer?._id,
      beneficiary: beneficiaryId,
    };

    return this.http.put<Fundraiser>(
      `${environment.BASE_URL}/api/fundraisers/${fundraiserId}`,
      customFundraiser
    );
  }

  /*non http services */
  getNumberOfComments(fundraiser: Fundraiser): number {
    let comments = fundraiser.donations?.filter((donation) => {
      if (donation.comment?.trim()) {
        return true;
      }
      return false;
    });

    return comments?.length || 0;
  }

  //to know if a fundraiser has a team (accepted members)
  hasAcceptedTeamMembers(fundraiser: Fundraiser): boolean {
    let team = fundraiser?.teams?.filter((member: TeamMember) => {
      if (member.status !== 'pending' &&  member.id.userId._id! !=fundraiser.organizer?._id!) return true;
      return false;
    });
    return team?.length! > 0;
  }

  //to know if a user has a has donated to a fundraiser
  hasDonated(fundraiser: Fundraiser, userId: string): boolean {
    let donation = fundraiser.donations?.find((donation: Donation) => {
      if (donation.userId?._id === userId) return true;
      return false;
    });
    return donation ? true : false;
  }

  // get the donation amount of a user to a fundraiser
  myDonation(fundraiser: Fundraiser, userId: string): number {
    let donation = fundraiser.donations?.find((donation: Donation) => {
      if (donation.userId?._id === userId) return true;
      return false;
    });
    return donation ? donation.amount : 0;
  }

  // get the number of team members of a fundraiser
  getNumberOfAcceptedTeamMembers(fundraiser: Fundraiser): number {
    let team = fundraiser.teams?.filter((member: TeamMember) => {
      if (member.status !== 'pending') return true;
      return false;
    });
    return team?.length!;
  }

  //to know if a fundraiser has a team (accepted members)
  hasPendingTeamMembers(fundraiser: Fundraiser): boolean {
    let team = fundraiser.teams?.filter((member: TeamMember) => {
      if (member.status === 'pending') return true;
      return false;
    });
    return team?.length! > 0;
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
