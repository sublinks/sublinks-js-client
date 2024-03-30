
import type { LocalUserId } from "./LocalUserId";

export interface LocalUserVoteDisplayMode {
  local_user_id: LocalUserId;
  score: boolean;
  upvotes: boolean;
  downvotes: boolean;
  upvote_percentage: boolean;
}
