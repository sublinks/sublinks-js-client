
import type { LocalUser } from "./LocalUser";
import type { LocalUserVoteDisplayMode } from "./LocalUserVoteDisplayMode";
import type { Person } from "./Person";
import type { PersonAggregates } from "./PersonAggregates";

export interface LocalUserView {
  local_user: LocalUser;
  local_user_vote_display_mode: LocalUserVoteDisplayMode;
  person: Person;
  counts: PersonAggregates;
}
