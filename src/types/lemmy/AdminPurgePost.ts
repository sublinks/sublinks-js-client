
import type { CommunityId } from "./CommunityId";
import type { PersonId } from "./PersonId";

export interface AdminPurgePost {
  id: number;
  admin_person_id: PersonId;
  community_id: CommunityId;
  reason?: string;
  when_: string;
}
