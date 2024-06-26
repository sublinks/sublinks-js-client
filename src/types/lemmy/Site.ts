
import type { InstanceId } from "./InstanceId";
import type { SiteId } from "./SiteId";

export interface Site {
  id: SiteId;
  name: string;
  sidebar?: string;
  published: string;
  updated?: string;
  icon?: string;
  banner?: string;
  description?: string;
  actor_id: string;
  last_refreshed_at: string;
  inbox_url: string;
  instance_id: InstanceId;
  content_warning?: string;
}
