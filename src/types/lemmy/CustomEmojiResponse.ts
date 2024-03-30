
import type { CustomEmojiView } from "./CustomEmojiView";

export interface CustomEmojiResponse {
  custom_emoji: CustomEmojiView,
  error?: string,
  message?: string,
}
