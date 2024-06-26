
import type { LocalSite } from "./LocalSite";
import type { LocalSiteRateLimit } from "./LocalSiteRateLimit";
import type { Site } from "./Site";
import type { SiteAggregates } from "./SiteAggregates";

export interface SiteView {
  site: Site;
  local_site: LocalSite;
  local_site_rate_limit: LocalSiteRateLimit;
  counts: SiteAggregates;
}
