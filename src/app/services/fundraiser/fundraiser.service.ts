import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HomeFundraiser } from 'src/app/models/home-fundraiser.model';
import { environment } from 'src/environments/environment';
import { Fundraiser } from 'src/app/models/fundraiser.model';
import { Donation } from 'src/app/models/donation.model';
import { TeamMember } from './../../models/team-memeber.model';

@Injectable({
  providedIn: 'root',
})
export class FundraiserService {
  constructor(private http: HttpClient) {}

  // get fundraisers by page
  getFundraisers(page: number): Observable<HomeFundraiser> {
    return this.http.get<HomeFundraiser>(
      `${environment.BASE_URL}/api/fundraisers/popular/?page=${page}`
    );
  }

  // create fundiser
  createFundraiser(fundraiser: Fundraiser): Observable<Fundraiser> {
    let customFundraiser = {
      ...fundraiser,
      isPublished: true,
      category: fundraiser.category?._id,
    };
    // console.log('cusome', customFundraiser), console.log('orginal', fundraiser);

    return this.http.post<Fundraiser>(
      `${environment.BASE_URL}/api/fundraisers`,
      customFundraiser
    );
  }

  //get a single fundraiser by id
  getFundraiser(fudriserId: string): Observable<Fundraiser> {
    return this.http.get<Fundraiser>(
      `${environment.BASE_URL}/api/fundraisers/${fudriserId}`
    );
  }

  // get fundraisers of current user
  getMyFundraisers(): Observable<HomeFundraiser> {
    return this.http.get<HomeFundraiser>(
      `${environment.BASE_URL}/api/fundraisers/user`
    );
  }

  // get team fundraisers of current user
  getMemeberFundraisers(): Observable<HomeFundraiser> {
    return this.http.get<HomeFundraiser>(
      `${environment.BASE_URL}/api/fundraisers/member`
    );
  }

  //Edit a fundraiser by id
  editFundraiser(fundraiser: Fundraiser): Observable<Fundraiser> {
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
    };
    return this.http.put<Fundraiser>(
      `${environment.BASE_URL}/api/fundraisers/${fundraiserId}`,
      customFundraiser
    );
  }

  // delete funraiser by id
  deleteFundraiser(fundraiserId: string): Observable<string> {
    return this.http.delete<string>(
      `${environment.BASE_URL}/api/fundraisers/${fundraiserId}`
    );
  }

  // search fundraiser by title
  search(title: string, page: number): Observable<HomeFundraiser> {
    return this.http.get<HomeFundraiser>(
      `${environment.BASE_URL}/api/fundraisers/title/${title}?page=${page}`
    );
  }

  /*non http sevices */
  getNumberOfComments(fundraiser: Fundraiser): number {
    let comments = fundraiser.donations?.filter((donation) => {
      if (donation.comment?.trim()) {
        return true;
      }
      return false;
    });

    return comments?.length || 0;
  }

  //to know if a fundraiser has a team (accepted mambers)
  hasAcceptedTeamMembers(fundraiser: Fundraiser): boolean {
    let team = fundraiser.teams?.filter((member: TeamMember) => {
      if (member.status !== 'pending') return true;
      return false;
    });
    return team?.length! > 0;
  }

  //to know if a user has a has donated to a fundraiser
  hasDonated(fundraiser: Fundraiser, userId: string): boolean {
    let donation = fundraiser.donations?.find((donation: Donation) => {
      if (donation.userId._id === userId) return true;
      return false;
    });
    return donation ? true : false;
  }

  // get the donation amount of a user to a fundraiser
  myDonation(fundraiser: Fundraiser, userId: string): number {
    let donation = fundraiser.donations?.find((donation: Donation) => {
      if (donation.userId._id === userId) return true;
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

  //to know if a fundraiser has a team (accepted mambers)
  hasPendingTeamMembers(fundraiser: Fundraiser): boolean {
    let team = fundraiser.teams?.filter((member: TeamMember) => {
      if (member.status === 'pending') return true;
      return false;
    });
    return team?.length! > 0;
  }
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
