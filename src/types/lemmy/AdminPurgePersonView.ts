
import type { AdminPurgePerson } from "./AdminPurgePerson";
import type { Person } from "./Person";

export interface AdminPurgePersonView {
  admin_purge_person: AdminPurgePerson;
  admin?: Person;
}
