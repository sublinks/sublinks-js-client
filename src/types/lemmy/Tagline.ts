
import type { LocalSiteId } from "./LocalSiteId";

export interface Tagline {
  id: number;
  local_site_id: LocalSiteId;
  content: string;
  published: string;
  updated?: string;
}
