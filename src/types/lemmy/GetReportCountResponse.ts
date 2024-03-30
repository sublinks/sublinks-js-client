
import type { CommunityId } from "./CommunityId";

export interface GetReportCountResponse {
  community_id?: CommunityId,
  comment_reports: /* integer */ number,
  post_reports: /* integer */ number,
  private_message_reports?: /* integer */ number,
  error?: string,
  message?: string,
}
