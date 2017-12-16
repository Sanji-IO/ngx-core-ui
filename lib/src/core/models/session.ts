import { UserProfile } from './user';

export interface Session {
  user?: UserProfile;
  token?: string | null;
}
