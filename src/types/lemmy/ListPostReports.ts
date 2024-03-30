
import type { CommunityId } from "./CommunityId";
import type { PostId } from "./PostId";

export interface ListPostReports {
  page?: /* integer */ number;
  limit?: /* integer */ number;
  unresolved_only?: boolean;
  community_id?: CommunityId;
  post_id?: PostId;
}
