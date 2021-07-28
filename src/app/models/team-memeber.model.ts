import { User } from './user.model';
export interface TeamMember{
  userId: User;
  hasRaised: number;
  shareCount: number;
}