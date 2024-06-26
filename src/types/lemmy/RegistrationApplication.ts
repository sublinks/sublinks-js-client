
import type { LocalUserId } from "./LocalUserId";
import type { PersonId } from "./PersonId";

export interface RegistrationApplication {
  id: number;
  local_user_id: LocalUserId;
  answer: string;
  admin_id?: PersonId;
  deny_reason?: string;
  published: string;
}
