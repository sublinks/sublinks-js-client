
import type { Comment } from "./Comment";
import type { CommentAggregates } from "./CommentAggregates";
import type { CommentReport } from "./CommentReport";
import type { Community } from "./Community";
import type { Person } from "./Person";
import type { Post } from "./Post";
import type { SubscribedType } from "./SubscribedType";

export interface CommentReportView {
  comment_report: CommentReport;
  comment: Comment;
  post: Post;
  community: Community;
  creator: Person;
  comment_creator: Person;
  counts: CommentAggregates;
  creator_banned_from_community: boolean;
  creator_is_moderator: boolean;
  creator_is_admin: boolean;
  creator_blocked: boolean;
  subscribed: SubscribedType;
  saved: boolean;
  my_vote?: number;
  resolver?: Person;
}
