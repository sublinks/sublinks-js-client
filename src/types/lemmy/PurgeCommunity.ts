
import type { CommunityId } from "./CommunityId";

export interface PurgeCommunity {
  community_id: CommunityId;
  reason?: string;
}
