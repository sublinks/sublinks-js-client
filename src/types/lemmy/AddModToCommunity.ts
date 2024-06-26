
import type { CommunityId } from "./CommunityId";
import type { PersonId } from "./PersonId";

export interface AddModToCommunity {
  community_id: CommunityId;
  person_id: PersonId;
  added: boolean;
}
