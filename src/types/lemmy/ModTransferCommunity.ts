
import type { CommunityId } from "./CommunityId";
import type { PersonId } from "./PersonId";

export interface ModTransferCommunity {
  id: number;
  mod_person_id: PersonId;
  other_person_id: PersonId;
  community_id: CommunityId;
  when_: string;
}
