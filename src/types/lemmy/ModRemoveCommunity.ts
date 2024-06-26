
import type { CommunityId } from "./CommunityId";
import type { PersonId } from "./PersonId";

export interface ModRemoveCommunity {
  id: number;
  mod_person_id: PersonId;
  community_id: CommunityId;
  reason?: string;
  removed: boolean;
  when_: string;
}
