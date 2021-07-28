import { Donation } from './donation.model';
import { TeamMember } from './team-memeber.model';
import { Category } from './category.model';
import { Location } from 'src/app/models/location.model';
import { User } from './user.model';
import { Update } from './update.model';

export interface Fundraiser {
  _id?: string;
  title: string;
  image: string;
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
  totalRaised?: number;
  isPublished?: boolean;
  totalShareCount?: number;
  likeCount?: number;
  // link: string;
}
