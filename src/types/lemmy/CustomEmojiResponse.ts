
import type { CustomEmojiView } from "./CustomEmojiView";

export interface CustomEmojiResponse {
  custom_emoji: CustomEmojiView,
  errors?: string[],
  message?: string,
  status?: string,
}
