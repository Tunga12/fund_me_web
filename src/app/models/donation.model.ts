import { User } from './user.model';
export interface Donation
{
  id?: string;
  userId: User;
  date?: Date;
  comment?: string;
  amount: number;
  tip: number;
}
