
import type { SiteId } from "./SiteId";

export interface SiteAggregates {
  site_id: SiteId;
  users: /* integer */ number;
  posts: /* integer */ number;
  comments: /* integer */ number;
  communities: /* integer */ number;
  users_active_day: /* integer */ number;
  users_active_week: /* integer */ number;
  users_active_month: /* integer */ number;
  users_active_half_year: /* integer */ number;
}
