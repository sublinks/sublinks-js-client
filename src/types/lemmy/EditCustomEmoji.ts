
import type { CustomEmojiId } from "./CustomEmojiId";

export interface EditCustomEmoji {
  id: CustomEmojiId;
  category: string;
  image_url: string;
  alt_text: string;
  keywords: Array<string>;
}
