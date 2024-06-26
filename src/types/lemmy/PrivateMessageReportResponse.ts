import type { PrivateMessageReportView } from "./PrivateMessageReportView";

export interface PrivateMessageReportResponse {
  private_message_report_view: PrivateMessageReportView,
  errors?: string[],
  message?: string,
  status?: string,
}
