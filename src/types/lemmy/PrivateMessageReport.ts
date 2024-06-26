
import type { PersonId } from "./PersonId";
import type { PrivateMessageId } from "./PrivateMessageId";
import type { PrivateMessageReportId } from "./PrivateMessageReportId";

export interface PrivateMessageReport {
  id: PrivateMessageReportId;
  creator_id: PersonId;
  private_message_id: PrivateMessageId;
  original_pm_text: string;
  reason: string;
  resolved: boolean;
  resolver_id?: PersonId;
  published: string;
  updated?: string;
}
