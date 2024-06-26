
import type { Community } from "./Community";
import type { ModHideCommunity } from "./ModHideCommunity";
import type { Person } from "./Person";

export interface ModHideCommunityView {
  mod_hide_community: ModHideCommunity;
  admin?: Person;
  community: Community;
}
