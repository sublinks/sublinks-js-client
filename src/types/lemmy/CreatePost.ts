
import type { CommunityId } from "./CommunityId";
import type { LanguageId } from "./LanguageId";

export interface CreatePost {
  name: string;
  community_id: CommunityId;
  url?: string;
  body?: string;
  alt_text?: string;
  honeypot?: string;
  nsfw?: boolean;
  language_id?: LanguageId;
  custom_thumbnail?: string;
}
