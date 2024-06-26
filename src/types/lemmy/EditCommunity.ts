
import type { CommunityId } from "./CommunityId";
import type { CommunityVisibility } from "./CommunityVisibility";
import type { LanguageId } from "./LanguageId";

export interface EditCommunity {
  community_id: CommunityId;
  title?: string;
  description?: string;
  icon?: string;
  banner?: string;
  nsfw?: boolean;
  posting_restricted_to_mods?: boolean;
  discussion_languages?: Array<LanguageId>;
  visibility?: CommunityVisibility;
}
