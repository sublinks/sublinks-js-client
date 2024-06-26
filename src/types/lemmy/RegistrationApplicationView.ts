
import type { LocalUser } from "./LocalUser";
import type { Person } from "./Person";
import type { RegistrationApplication } from "./RegistrationApplication";

export interface RegistrationApplicationView {
  registration_application: RegistrationApplication;
  creator_local_user: LocalUser;
  creator: Person;
  admin?: Person;
}
