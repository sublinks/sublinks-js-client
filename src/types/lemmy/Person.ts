
import type { InstanceId } from "./InstanceId";
import type { PersonId } from "./PersonId";

export interface Person {
  id: PersonId;
  name: string;
  display_name?: string;
  avatar?: string;
  banned: boolean;
  published: string;
  updated?: string;
  actor_id: string;
  bio?: string;
  local: boolean;
  banner?: string;
  deleted: boolean;
  matrix_user_id?: string;
  bot_account: boolean;
  ban_expires?: string;
  instance_id: InstanceId;
}
