
import type { Community } from "./Community";
import type { ModBanFromCommunity } from "./ModBanFromCommunity";
import type { Person } from "./Person";

export interface ModBanFromCommunityView {
  mod_ban_from_community: ModBanFromCommunity;
  moderator?: Person;
  community: Community;
  banned_person: Person;
}
