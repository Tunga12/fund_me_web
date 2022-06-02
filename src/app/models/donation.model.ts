import { User } from './user.model';
export interface Donation {
  id?: string;
  userId?: string | null;
  name?: string;
  date?: string;
  comment?: string;
  amount: number;
  tip: number;
  isAnonymous?: boolean;
  memberId?: string;
  paymentMethod: string;
  fundId?: string;
}



export interface PendingDonation {
  id?: string;
  userId?: string | null;
  name?: string;
  fundId: string;
  date?: string;
  comment?: string;
  amount: number;
  tip: number;
  isAnonymous?: boolean;
  memberId?: string;
  paymentMethod: string;
}

export interface DonationInfo {
  total?: number;
  totalComments?: number;
  first?: Array<Donation>;
  top?: Array<Donation>;
  withComments?: Array<Donation>;
  all?: Array<Donation>;
  allTop?: Array<Donation>;
}