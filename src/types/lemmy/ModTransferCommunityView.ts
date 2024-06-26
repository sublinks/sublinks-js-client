
import type { Community } from "./Community";
import type { ModTransferCommunity } from "./ModTransferCommunity";
import type { Person } from "./Person";

export interface ModTransferCommunityView {
  mod_transfer_community: ModTransferCommunity;
  moderator?: Person;
  community: Community;
  modded_person: Person;
}
