import type { CommunityView } from "./CommunityView";

export interface ListCommunitiesResponse {
  communities: Array<CommunityView>,
  error?: string,
  message?: string,
}
