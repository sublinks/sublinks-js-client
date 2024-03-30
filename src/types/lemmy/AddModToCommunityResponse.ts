
import type { CommunityModeratorView } from "./CommunityModeratorView";

export interface AddModToCommunityResponse {
  moderators: Array<CommunityModeratorView>,
  error?: string,
  message?: string,
}
