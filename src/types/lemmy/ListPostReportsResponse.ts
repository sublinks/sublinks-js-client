import type { PostReportView } from "./PostReportView";

export interface ListPostReportsResponse {
  post_reports: Array<PostReportView>,
  errors?: string[],
  message?: string,
  status?: string,
}
