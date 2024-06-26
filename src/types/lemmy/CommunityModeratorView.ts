
import type { Community } from "./Community";
import type { Person } from "./Person";

export interface CommunityModeratorView {
  community: Community;
  moderator: Person;
}
