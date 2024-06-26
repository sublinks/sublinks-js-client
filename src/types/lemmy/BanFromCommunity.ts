
import type { CommunityId } from "./CommunityId";
import type { PersonId } from "./PersonId";

export interface BanFromCommunity {
  community_id: CommunityId;
  person_id: PersonId;
  ban: boolean;
  remove_data?: boolean;
  reason?: string;
  expires?: /* integer */ number;
}
