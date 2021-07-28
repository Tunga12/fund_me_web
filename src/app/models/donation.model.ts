import { User } from './user.model';
export interface Donation
{
  id?: string;
  userId: User;
  date: string;
  comment: string;
  amount:string;
}
