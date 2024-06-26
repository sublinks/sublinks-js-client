
import type { CustomEmoji } from "./CustomEmoji";
import type { CustomEmojiKeyword } from "./CustomEmojiKeyword";

export interface CustomEmojiView {
  custom_emoji: CustomEmoji;
  keywords: Array<CustomEmojiKeyword>;
}
