
import type { CommunityId } from "./CommunityId";

export interface DeleteCommunity {
  community_id: CommunityId;
  deleted: boolean;
}
