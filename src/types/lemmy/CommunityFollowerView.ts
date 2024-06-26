
import type { Community } from "./Community";
import type { Person } from "./Person";

export interface CommunityFollowerView {
  community: Community;
  follower: Person;
}
