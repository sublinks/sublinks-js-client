
import type { Comment } from "./Comment";
import type { CommentAggregates } from "./CommentAggregates";
import type { Community } from "./Community";
import type { Person } from "./Person";
import type { Post } from "./Post";
import type { SubscribedType } from "./SubscribedType";

export interface CommentView {
  comment: Comment;
  creator: Person;
  post: Post;
  community: Community;
  counts: CommentAggregates;
  creator_banned_from_community: boolean;
  creator_is_moderator: boolean;
  creator_is_admin: boolean;
  subscribed: SubscribedType;
  saved: boolean;
  creator_blocked: boolean;
  my_vote?: number;
}
