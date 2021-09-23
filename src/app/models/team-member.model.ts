import { User } from './user.model';
export interface TeamMember {
  id: {
    userId: User;
    hasRaised: number;
    shareCount: number;
    _id: string;
  };
  status: string;
}
