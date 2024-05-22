
import type { CommunityModeratorView } from "./CommunityModeratorView";

export interface AddModToCommunityResponse {
  moderators: Array<CommunityModeratorView>,
  errors?: string[],
  message?: string,
  status?: string,
}
