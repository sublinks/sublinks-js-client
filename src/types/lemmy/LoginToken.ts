
import type { LocalUserId } from "./LocalUserId";

export interface LoginToken {
  user_id: LocalUserId;
  published: string;
  ip?: string;
  user_agent?: string;
}
