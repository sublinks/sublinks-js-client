
import type { CommunityId } from "./CommunityId";

export interface HideCommunity {
  community_id: CommunityId;
  hidden: boolean;
  reason?: string;
}
