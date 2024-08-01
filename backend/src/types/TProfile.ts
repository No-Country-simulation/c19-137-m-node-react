import { Media, User } from '@/graphql.schema';

interface TProfile {
  user: User;
  profileCoverImage: Media;
  profileImage: Media;
}

export { TProfile };
