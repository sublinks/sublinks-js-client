
import type { CommunityView } from "./CommunityView";

export interface BlockCommunityResponse {
  community_view: CommunityView,
  blocked: boolean,
  errors?: string[],
  message?: string,
  status?: string,
}
