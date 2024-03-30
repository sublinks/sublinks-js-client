
import type { Community } from "./Community";
import type { CommunityAggregates } from "./CommunityAggregates";
import type { SubscribedType } from "./SubscribedType";

export interface CommunityView {
  community: Community;
  subscribed: SubscribedType;
  blocked: boolean;
  counts: CommunityAggregates;
  banned_from_community: boolean;
}
