import { Fundraiser } from './fundraiser.model';

export interface Withdrawal {
  status?: string;
  isDeleted?: boolean;
  _id?: string;
  bankName: string;
  bankAccountNo: string;
  isOrganizer?: boolean;
  date?: string;
  reason: string;
  fundraiser: Fundraiser;
}
