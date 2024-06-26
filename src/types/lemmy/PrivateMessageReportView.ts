
import type { Person } from "./Person";
import type { PrivateMessage } from "./PrivateMessage";
import type { PrivateMessageReport } from "./PrivateMessageReport";

export interface PrivateMessageReportView {
  private_message_report: PrivateMessageReport;
  private_message: PrivateMessage;
  private_message_creator: Person;
  creator: Person;
  resolver?: Person;
}
