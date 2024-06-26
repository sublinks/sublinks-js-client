
import type { Community } from "./Community";
import type { ModAddCommunity } from "./ModAddCommunity";
import type { Person } from "./Person";

export interface ModAddCommunityView {
  mod_add_community: ModAddCommunity;
  moderator?: Person;
  community: Community;
  modded_person: Person;
}
