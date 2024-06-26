
import type { CustomEmojiId } from "./CustomEmojiId";
import type { LocalSiteId } from "./LocalSiteId";

export interface CustomEmoji {
  id: CustomEmojiId;
  local_site_id: LocalSiteId;
  shortcode: string;
  image_url: string;
  alt_text: string;
  category: string;
  published: string;
  updated?: string;
}
