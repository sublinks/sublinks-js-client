
import type { CommunityId } from "./CommunityId";

export interface CommunityAggregates {
  community_id: CommunityId;
  subscribers: /* integer */ number;
  posts: /* integer */ number;
  comments: /* integer */ number;
  published: string;
  users_active_day: /* integer */ number;
  users_active_week: /* integer */ number;
  users_active_month: /* integer */ number;
  users_active_half_year: /* integer */ number;
  subscribers_local: /* integer */ number;
}
