
import type { CommunityId } from "./CommunityId";
import type { PersonId } from "./PersonId";

export interface ModHideCommunity {
  id: number;
  community_id: CommunityId;
  mod_person_id: PersonId;
  when_: string;
  reason?: string;
  hidden: boolean;
}
