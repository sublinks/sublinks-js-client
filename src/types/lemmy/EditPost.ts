
import type { LanguageId } from "./LanguageId";
import type { PostId } from "./PostId";

export interface EditPost {
  post_id: PostId;
  name?: string;
  url?: string;
  body?: string;
  alt_text?: string;
  nsfw?: boolean;
  language_id?: LanguageId;
  custom_thumbnail?: string;
}
