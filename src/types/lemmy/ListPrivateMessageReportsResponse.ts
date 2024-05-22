import type { PrivateMessageReportView } from "./PrivateMessageReportView";

export interface ListPrivateMessageReportsResponse {
  private_message_reports: Array<PrivateMessageReportView>,
  errors?: string[],
  message?: string,
  status?: string,
}
