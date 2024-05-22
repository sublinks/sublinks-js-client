import type { CommunityView } from "./CommunityView";

export interface ListCommunitiesResponse {
  communities: Array<CommunityView>,
  errors?: string[],
  message?: string,
  status?: string,
}
