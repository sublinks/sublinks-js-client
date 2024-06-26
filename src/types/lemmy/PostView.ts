
import type { Community } from "./Community";
import type { Person } from "./Person";
import type { Post } from "./Post";
import type { PostAggregates } from "./PostAggregates";
import type { SubscribedType } from "./SubscribedType";

export interface PostView {
  post: Post;
  creator: Person;
  community: Community;
  creator_banned_from_community: boolean;
  creator_is_moderator: boolean;
  creator_is_admin: boolean;
  counts: PostAggregates;
  subscribed: SubscribedType;
  saved: boolean;
  read: boolean;
  hidden: boolean;
  creator_blocked: boolean;
  my_vote?: number;
  unread_comments: /* integer */ number;
}
