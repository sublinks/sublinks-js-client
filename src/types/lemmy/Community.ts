
import type { CommunityId } from "./CommunityId";
import type { CommunityVisibility } from "./CommunityVisibility";
import type { InstanceId } from "./InstanceId";

export interface Community {
  id: CommunityId;
  name: string;
  title: string;
  description?: string;
  removed: boolean;
  published: string;
  updated?: string;
  deleted: boolean;
  nsfw: boolean;
  actor_id: string;
  local: boolean;
  icon?: string;
  banner?: string;
  hidden: boolean;
  posting_restricted_to_mods: boolean;
  instance_id: InstanceId;
  visibility: CommunityVisibility;
}
