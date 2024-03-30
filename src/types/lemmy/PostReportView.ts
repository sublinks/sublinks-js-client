
import type { Community } from "./Community";
import type { Person } from "./Person";
import type { Post } from "./Post";
import type { PostAggregates } from "./PostAggregates";
import type { PostReport } from "./PostReport";
import type { SubscribedType } from "./SubscribedType";

export interface PostReportView {
  post_report: PostReport;
  post: Post;
  community: Community;
  creator: Person;
  post_creator: Person;
  creator_banned_from_community: boolean;
  creator_is_moderator: boolean;
  creator_is_admin: boolean;
  subscribed: SubscribedType;
  saved: boolean;
  read: boolean;
  hidden: boolean;
  creator_blocked: boolean;
  my_vote?: number;
  unread_comments: /* integer */ number;
  counts: PostAggregates;
  resolver?: Person;
}
