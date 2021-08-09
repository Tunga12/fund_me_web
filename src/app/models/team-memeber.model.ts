import { User } from './user.model';
export interface TeamMember {
  id: { userId: User; hasRaised: number; shareCount: number };
  status: string;
}
