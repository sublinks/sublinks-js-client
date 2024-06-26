
import type { Person } from "./Person";
import type { PersonAggregates } from "./PersonAggregates";

export interface PersonView {
  person: Person;
  counts: PersonAggregates;
  is_admin: boolean;
}
