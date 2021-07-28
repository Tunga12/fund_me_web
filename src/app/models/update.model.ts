import { User } from './user.model';
export interface Update {
  id?: string;
  userId?: User;
  image: string;
  content: string;
  dateCreated: string;
}