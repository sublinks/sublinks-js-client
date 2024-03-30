
import type { ListingType } from "./ListingType";
import type { LocalUserId } from "./LocalUserId";
import type { PersonId } from "./PersonId";
import type { PostListingMode } from "./PostListingMode";
import type { SortType } from "./SortType";

export interface LocalUser {
  id: LocalUserId;
  person_id: PersonId;
  email?: string;
  show_nsfw: boolean;
  theme: string;
  default_sort_type: SortType;
  default_listing_type: ListingType;
  interface_language: string;
  show_avatars: boolean;
  send_notifications_to_email: boolean;
  show_scores: boolean;
  show_bot_accounts: boolean;
  show_read_posts: boolean;
  email_verified: boolean;
  accepted_application: boolean;
  open_links_in_new_tab: boolean;
  blur_nsfw: boolean;
  auto_expand: boolean;
  infinite_scroll_enabled: boolean;
  admin: boolean;
  post_listing_mode: PostListingMode;
  totp_2fa_enabled: boolean;
  enable_keyboard_navigation: boolean;
  enable_animated_images: boolean;
  collapse_bot_comments: boolean;
}
