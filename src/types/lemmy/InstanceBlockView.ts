
import type { Instance } from "./Instance";
import type { Person } from "./Person";
import type { Site } from "./Site";

export interface InstanceBlockView {
  person: Person;
  instance: Instance;
  site?: Site;
}
