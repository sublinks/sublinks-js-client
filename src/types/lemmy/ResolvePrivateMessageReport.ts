
import type { PrivateMessageReportId } from "./PrivateMessageReportId";

export interface ResolvePrivateMessageReport {
  report_id: PrivateMessageReportId;
  resolved: boolean;
}
