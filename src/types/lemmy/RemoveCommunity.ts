
import type { CommunityId } from "./CommunityId";

export interface RemoveCommunity {
  community_id: CommunityId;
  removed: boolean;
  reason?: string;
}
