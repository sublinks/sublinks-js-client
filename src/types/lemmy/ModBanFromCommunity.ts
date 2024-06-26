
import type { CommunityId } from "./CommunityId";
import type { PersonId } from "./PersonId";

export interface ModBanFromCommunity {
  id: number;
  mod_person_id: PersonId;
  other_person_id: PersonId;
  community_id: CommunityId;
  reason?: string;
  banned: boolean;
  expires?: string;
  when_: string;
}
