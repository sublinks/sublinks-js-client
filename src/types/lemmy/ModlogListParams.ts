
import type { CommentId } from "./CommentId";
import type { CommunityId } from "./CommunityId";
import type { PersonId } from "./PersonId";
import type { PostId } from "./PostId";

export interface ModlogListParams {
  community_id?: CommunityId;
  mod_person_id?: PersonId;
  other_person_id?: PersonId;
  post_id?: PostId;
  comment_id?: CommentId;
  page?: /* integer */ number;
  limit?: /* integer */ number;
  hide_modlog_names: boolean;
}
