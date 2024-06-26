
import type { Community } from "./Community";
import type { ModRemoveCommunity } from "./ModRemoveCommunity";
import type { Person } from "./Person";

export interface ModRemoveCommunityView {
  mod_remove_community: ModRemoveCommunity;
  moderator?: Person;
  community: Community;
}
