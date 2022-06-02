import { Donation } from './donation.model';
import { Category } from './category.model';
import { Location } from 'src/app/models/location.model';
import { User } from './user.model';
import { Update } from './update.model';
import { Withdrawal } from './withdrawal.model';
import { TeamMember } from './team-member.model';
import { PaymentInfo } from './paymentInfo.model';

export interface Fundraiser {
  __v?: any;
  _id?: string;
  title: string;
  image?: string;
  goalAmount?: number;
  category?: Category;
  story: string;
  location: Location;
  updates?: Update[];
  donations?: Donation[];
  teams?: TeamMember[];
  dateCreated?: string;
  organizer?: User;
  beneficiary?: User;
  totalRaised?: {
    birr: number;
    dollar: number;
  };
  isPublished?: boolean;
  totalShareCount?: number;
  likeCount?: number;
  withdraw?: Withdrawal;
  totalWithdraw?: Withdraw[];
  isBlocked?: boolean;

  totalPayed?: {
    birr: number;
    dollar: number;
  };

  paymentInfo?: PaymentInfo;
}

interface Withdraw {
  date: Date;
  amount: number;
}

