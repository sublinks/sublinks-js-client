
import type { CommentId } from "./CommentId";
import type { CommunityId } from "./CommunityId";

export interface ListCommentReports {
  comment_id?: CommentId;
  page?: /* integer */ number;
  limit?: /* integer */ number;
  unresolved_only?: boolean;
  community_id?: CommunityId;
}
